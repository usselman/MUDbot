const channels = ['1013894923696734298', '1013894991506067566', '1010832609011576922', '1010832654238765107', 
'1010833038340522075', '1013637272790380595'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mainframe')
		.setDescription('MUDbot will post to the mainframe for you.')
        .addStringOption(option =>
            option.setName('post')
                .setDescription('What you would like posted.')
                .setRequired(true)),
	async execute(interaction) {
        const post = interaction.options.getString('post');
        
        let response = `${post}`;
        //client.channels.fetch(channels[getRandomInt(channels.length)]);
        //await interaction.guild.channels.cache.get(channels[getRandomInt(channels.length)]).send({ content: response });
        await interaction.guild.channels.cache.get(channels[getRandomInt(channels.length)]).send({ content: response });
        //interaction.reply({ content: response, ephemeral: true });
    },
};