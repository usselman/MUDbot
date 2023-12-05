function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const { SlashCommandBuilder } = require('discord.js');
const https = require('https');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask MUDBot a question').addStringOption(option =>
            option.setName('question')
                .setDescription('The question that you want answered')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        let response = `*You asked:* "${question}", \n*I answer:* `;
        response += await getAnswer(question);

        interaction.reply({ content: response });

    },
};

async function getAnswer(question) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = JSON.stringify({
        prompt: question,
        model: 'gpt-3.5-turbo-0301',
        max_tokens: 100,
        n: 1,
        stop: '\n'
    });
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            const filePath = path.join(__dirname, 'response.json');
            const fileStream = fs.createWriteStream(filePath);

            res.pipe(fileStream);
            fileStream.on('error', (error) => {
                console.error(error);
                reject(error);
            });
            fileStream.on('finish', () => {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }
                    const response = JSON.parse(data);
                    if (!response.choices || response.choices.length === 0 || !response.choices[0].text) {
                        const error = new Error('Invalid response from API');
                        console.error(error);
                        reject(error);
                    } else {
                        resolve(response.choices[0].text);
                    }
                    console.log(response);
                    resolve(response.choices[0].text);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            });
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}
