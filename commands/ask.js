const OpenAI = require("openai");
const { SlashCommandBuilder } = require('@discordjs/builders');

const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask MUDBot a question')
        .addStringOption(option =>
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
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Update the model name as needed
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: question }],
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
        });

        if (response && response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
            return response.choices[0].message.content;
        } else {
            throw new Error('Invalid response from API');
        }
    } catch (error) {
        throw error;
    }
}
