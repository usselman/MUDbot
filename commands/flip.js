const { SlashCommandBuilder } = require('discord.js');

let h=0;
let t=0;
let total;
let result;
var ratio;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function flipACoin() {
    switch (getRandomInt(2)) {
        case 0:
            h++;
            total = (h+t);
            ratio = ((h)/total);
            result = 'Heads';
            return result;
            break;
        case 1:
            t++;
            total = (h+t);
            ratio = ((t)/total);
            result = 'Tails';
            return result;
            
    }
    
    console.log(ratio);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('MUDbot will flip a coin for you!'),
	async execute(interaction) {
        flipACoin();
        console.log(total);

		await interaction.reply(
            '*I flipped a coin landing on:* ' +
            '**' + result + '.**\n'
            + 'The ratio is: **' + h + '** Heads and **' + t + '** Tails out of **' + total + '** attempts, meaning\n' 
            + result + ' happens ***' + (Math.floor((ratio.toFixed(4))*100)) + '%*** of the time.'
            );
	},
};