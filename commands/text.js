const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('text')
		.setDescription('generates text'),
	async execute(interaction) {

		/*
		var fs = require("fs");
        fs.readFile("./hello.txt", function(err, text){
        var textByLine = text.toString('utf-8').split("\n")
        });
		*/
        console.log(typeof text);
        //interaction.reply(textByLine);
		interaction.reply("Coming soon ...");
        
	},
};