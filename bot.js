function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const { token } = require('./config.json');


client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nCreated on: ${interaction.guild.createdAt}');
	} else if (commandName === 'user') {
		await interaction.reply('Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}');
	} else if (commandName === 'ask') {
        const question = interaction.options.getString('question');
        let response = `You asked "${question}", \n`;

        switch (getRandomInt(10)) {
            case 0:
                //interaction.reply(client.message.content);
                //interaction.reply('You asked, I reply: ')
                
                //await interaction.reply('commandUser: ${commandUser}, It is certain!');
                
                response += 'It is certain!';
                break;
            case 1:
                //interaction.reply('You asked, I reply: ')
                //await interaction.reply('commandUser: ${commandUser}, Without a doubt.');
                response += 'Without a doubt.';
                break;
            case 2:
                //interaction.reply('You asked, I reply: ')
                response += "Yes, definitely";
                break;
            case 3:
                //interaction.reply('You asked, I reply: ')
                response += 'As I see it, yes.';
                break;
            case 4:
                //interaction.reply(client.Message.content);
                response += 'Most likely.';
                break;
            case 5:
                
                response += 'Outlook good.';
                break;
            case 6:
                
                response += 'Reply hazy, try again.';
                break;
            case 7:
                
                response += 'Cannot predict at this time.';
                break;
            case 8:
                
                response += 'Don’t count on it.';
                break;
            case 9:
                
                response += 'Outlook not so good.';
        }
        interaction.reply(response);
    }
});

client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === 'hello') {
        msg.reply('Hello User');
    }
}

client.login(token);

