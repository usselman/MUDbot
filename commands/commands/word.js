const { SlashCommandBuilder } = require('discord.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z', 'st', 'dr', 'cl', 'fl', 'bl', 'cr', 'pl', 'ed', 
'gr', 'pr', 'gl', 'te','b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
'p', 'r', 's', 't', 'v', 'y', 'sc', 'st', 'dr', 'cl', 'cr', 'tr', 'pr'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'a', 'e', 'o', 'ae', 'ie', 'oa'];
const word = [];

let length;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('word')
		.setDescription('MUDbot will generate a word for you!'),
	async execute(interaction) {
        length = getRandomInt(6);
        length+=2;
        for (let i = 0; i<length; i++){
            word[i] = letters[getRandomInt(letters.length)];
            if(i%2){
                word[i] = vowels[getRandomInt(vowels.length)];
            }
        }
        console.log(word);
        let final = word.join('');
        word.length = 0;
		await interaction.reply('*I created the word:* **"' + final + '"** *for you.*');
        
	},
};