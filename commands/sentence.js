const { SlashCommandBuilder } = require('discord.js');

const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z', 'st', 'dr', 'cl', 'fl', 'bl', 'cr', 'pl', 'ed', 
'gr', 'pr', 'gl', 'te','b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
'p', 'r', 's', 't', 'v', 'y', 'sc', 'st', 'dr', 'cl', 'cr', 'tr', 'pr'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'a', 'e', 'o', 'ae', 'ie', 'oa'];
const word = [];
const sentence = [];

let length;
let numWords;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateWord() {
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
    return final;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sentence')
		.setDescription('MUDbot will generate a FANTASTICAL sentence for you!'),
	async execute(interaction) {
        numWords = getRandomInt(18);
        numWords+=2;

        for(let i =0; i<numWords; i++){
            sentence[i] = generateWord();
        }
        
        
		await interaction.reply('*I created this sentence:* **"' + sentence.join(' ') + '."**');
        sentence.length = 0;
        console.log(sentence);
	},
};