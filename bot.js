const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, messageLink, Message} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

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
	channel.send('I am online! Check #rules for my commands.');
    client.user.setActivity('Standing by...');
	
});

client.on('interactionCreate', async interaction => {
	//interaction.guild.channels.cache.get('1014988510702346362').send({ content: 'Hello world!' });
	if (!interaction.isChatInputCommand()) return;
    client.user.setActivity('in the Mud :D')
	

	const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

//last always
client.login(token);

