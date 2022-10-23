function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function convertToBinary1 (number) {
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binary =  (num % 2) + (binary);
    }
    return binary;
}

function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

String.prototype.convertToRGB = function(){
  if(this.length != 6){

      return "Only six-digit hex colors are allowed.";

      //return "Only six-digit hex colors are allowed.";

  }

  var aRgbHex = this.match(/.{1,2}/g);
  var aRgb = ['[ ' +
      parseInt(aRgbHex[0], 16), '  ' +
      parseInt(aRgbHex[1], 16), '  ' +
      parseInt(aRgbHex[2], 16) + ' ]'
  ];
  return aRgb;
}

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('number')
		.setDescription('MUDBot can generate a number for you!'),
	async execute(interaction) {

		let x = getRandomInt(9999999);


    let isPrime = true;

    for (let i = 2; i < x; i++) {
      if (x % i == 0) {
          isPrime = false;
          break;
      }
  }
    let prime = '';
    if(isPrime){
      prime = '**Is**';
    }else {
      prime = '**Is not**'
    }
		await interaction.reply('*I generated decimal number:* **' + x + 
		'**\n*In binary that would be:* **' + 
		convertToBinary1(x) + '**\n*In hexadecimal that would be:* **' +
		decimalToHexString(x) + '**\n*In RGB colors that would be:* **' +
    decimalToHexString(x).convertToRGB() + '**' 
    + '\n' + prime + ' a prime number.');
	},
};