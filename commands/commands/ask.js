function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask MUDBot a yes or no question').addStringOption(option =>
            option.setName('question')
                .setDescription('The question that you want answered')
                .setRequired(true)),
	async execute(interaction) {
		const question = interaction.options.getString('question');
        let response = `*You asked:* "${question}", \n*I answer:* `;

        switch (getRandomInt(15)) {
            case 0:
                //interaction.reply(client.message.content);
                //interaction.reply('You asked, I reply: ')
                
                //await interaction.reply('commandUser: ${commandUser}, It is certain!');
                
                response += '**It is certain!**';
                break;
            case 1:
                //interaction.reply('You asked, I reply: ')
                //await interaction.reply('commandUser: ${commandUser}, Without a doubt.');
                response += '**Without a doubt.**';
                break;
            case 2:
                //interaction.reply('You asked, I reply: ')
                response += '**Yes, definitely.**';
                break;
            case 3:
                //interaction.reply('You asked, I reply: ')
                response += '**As I see it, yes.**';
                break;
            case 4:
                //interaction.reply(client.Message.content);
                response += '**Most likely, of all permutations.**';
                break;
            case 5:
                
                response += '**Outlook is good. I have run the numbers.**';
                break;
            case 6:
                
                response += '**Future is hazy, try again.**';
                break;
            case 7:
                
                response += '**Cannot predict at this time. Too many variables.**';
                break;
            case 8:
                
                response += "**I wouldn't count on it.**";
                break;
            case 9:
                
                response += '**Outlook not so good. The numbers do not lie.**';
                break;
            case 10:
                response += '**Absolutely not!**'
                break;
            
            case 11: 
                response += '**Unsure. Consequences potentially dire.**'
                break;
            
            case 12:
                response += '**Testing the limits of comprehension... but likely yes.**'
                break;
            
            case 13:
                response += '**Testing the limits of comprehension... but likely no.**'
                break;
            
            case 14:
                response += '**From a certain perspective, yes.**'
        }
        interaction.reply(response);
	},
};