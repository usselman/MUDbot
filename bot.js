const fs = require('node:fs');
const path = require('node:path');
const https = require('https');
const { Client, Collection, GatewayIntentBits, messageLink, Message } = require('discord.js');
//const { token } = require('./config.json');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN;

const { time } = require('node:console');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	//send i'm online! message in campfire
	const channel = client.channels.cache.get('1022424180454588416');
	// channel.send('I am online at ' + Date()
	// 	+ '! \nCheck <#1010833300396457984> for my commands.');
	client.user.setActivity('Standing by...');

});

client.on('interactionCreate', async interaction => {
	//interaction.guild.channels.cache.get('1014988510702346362').send({ content: 'Hello world!' });
	if (!interaction.isChatInputCommand()) return;
	client.user.setActivity('in the Mud :D')


	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	// const question = interaction.options.getString('question');
	// const response = await getAnswer(question);

	// interaction.reply({ content: response });

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

// async function getAnswer(question) {
// 	const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
// 	const data = JSON.stringify({
// 		prompt: question,
// 		max_tokens: 100,
// 		n: 1,
// 		stop: '\n',
// 	});
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
// 		},
// 	};

// 	return new Promise((resolve, reject) => {
// 		const req = https.request(url, options, (res) => {
// 			const filePath = path.join(__dirname, 'response.json');
// 			const fileStream = fs.createWriteStream(filePath);

// 			res.pipe(fileStream);
// 			fileStream.on('error', (error) => {
// 				console.error(error);
// 				reject(error);
// 			});
// 			fileStream.on('finish', () => {
// 				fs.readFile(filePath, (err, data) => {
// 					if (err) {
// 						console.error(err);
// 						reject(err);
// 						return;
// 					}
// 					const response = JSON.parse(data);
// 					resolve(response.choices[0].text);
// 					fs.unlink(filePath, (err) => {
// 						if (err) {
// 							console.error(err);
// 						}
// 					});
// 				});
// 			});
// 		});

// 		req.on('error', (error) => {
// 			console.error(error);
// 			reject(error);
// 		});

// 		req.write(data);
// 		req.end();
// 	});
// }

//last always
client.login(token);
//client.login(process.env.DISCORD_TOKEN);

