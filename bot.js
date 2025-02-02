const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Import node-schedule for scheduling tasks
const schedule = require('node-schedule');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,     // Needed to fetch messages
		GatewayIntentBits.MessageContent     // Needed to read message content
	]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const channels = [
	'1013894923696734298',
	'1013894991506067566',
	'1010832609011576922',
	'1010832654238765107',
	'1010833038340522075',
	'1013637272790380595',
	'1032332046275723285',
	'1032332174302650398'
];

// Utility to generate a random integer from 0 to max - 1
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

client.once('ready', () => {
	console.log('Ready!');

	// Retrieve the campfire channel once the client is ready.
	const campfireChannel = client.channels.cache.get('1022424180454588416');
	if (campfireChannel) {
		campfireChannel.send('I live! \nCheck <#1010833300396457984> for my commands.');
	}
	client.user.setActivity('Standing by...');

	// Schedule the hourly repost function using node-schedule.
	// The cron expression '0 * * * *' schedules the job at minute 0 of every hour.
	schedule.scheduleJob('1 * * *', async () => {
		try {
			console.log('Reposting a random message...');
			// Select one of the mainframe channels at random.
			const randomChannelId = channels[getRandomInt(channels.length)];
			const mainframeChannel = client.channels.cache.get(randomChannelId);

			console.log(`Reposting a random message from channel ${randomChannelId}`);

			if (!mainframeChannel) {
				console.error(`Mainframe channel with ID ${randomChannelId} not found.`);
				return;
			}

			// Fetch the most recent 100 messages from the selected channel.
			const fetchedMessages = await mainframeChannel.messages.fetch({ limit: 100 });
			if (fetchedMessages.size === 0) {
				console.log(`No messages found in channel ${mainframeChannel.name}`);
				return;
			}

			// Convert the Collection to an array and select a random message.
			const messagesArray = Array.from(fetchedMessages.values());
			const randomMessage = messagesArray[getRandomInt(messagesArray.length)];

			// Create a link to the original message.
			const messageLinkUrl = `https://discord.com/channels/${randomMessage.guild.id}/${mainframeChannel.id}/${randomMessage.id}`;

			// Build the repost message including the original author, date, and channel.
			const repostContent =
				`**Reposted from [#${mainframeChannel.name}](${messageLinkUrl})**\n` +
				`*Author: ${randomMessage.author}*\n` +
				`*Date: ${randomMessage.createdAt.toLocaleString()}*\n\n` +
				`${randomMessage.content}`;

			// Post the repost in the campfire channel.
			if (campfireChannel) {
				await campfireChannel.send(repostContent);
				console.log(`Reposted a message from ${mainframeChannel.name}`);
			} else {
				console.error("Campfire channel not found.");
			}
		} catch (error) {
			console.error("Error in reposting a random message:", error);
		}
	});
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	client.user.setActivity('in the Mud :D');
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
