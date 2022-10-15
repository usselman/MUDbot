const { SlashCommandBuilder } = require('discord.js');

let length;

const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
    'p', 'r', 's', 't', 'v', 'y'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'a', 'e', 'o', 'ae', 'ie', 'oa'];

const name1 = ['Jh', 'An', 'Ec', 'En', 'Lh', 'Ha', 'Het', 'Gh', 'Mt', 'Al', 'Olp', 'Elp', 'Em', 
                'On', 'Tum', 'Tep', 'Pos', 'Cn', 'Kn', 'Del', 'Det', 'Dat',  'Shav', 'Vas', 'Tern', 'Kol', 'Gant', 'Jos', 'Alph', 'Men', 'Tav', 'Olen', 'Mol', 'Godr', 
                'Dem', 'Gol', 'Mel', 'Kat', 'Duf', 'Diam', 'Lonn', 'Kohl', 'Elum', 'Alum', 'Palum', 'Oner', 'Anut', 'Hem',
                'Colm', 'Mol', 'Kolet', 'Uden', 'Umen', 'Amen', 'Akhen', 'Toll', 'Est', 'Kotr'];
const name2 = ['a', 'o','i', 'y', 'e', 'u', 'ei', 'ul', 'el', 'al', 'at', 'at', 'em', 'im', 'om', 'un', 'oc', 'es', 'il', 'al', 'af', 'of', 'ex', 'ox',
 'ack', 'am', 'yn', 'in', 'ent', 'og', 'oc', 'ack', 'umn', 'od', 
                'ies', 'ozn', 'azn', 'usan', 'emr', 'got', 'kol', 'cul', 'ec', 'ell', 'ill', 'ack'];
const name3 = ['os', 'h', 'ote', 'un', 'at', 'ot', 'us', 'en', 'a', 'e', 'o','u', 'i', 'es', 'ul', 'ura', 'ur', 'or', 'er', 'el', 'ol',
                 'eo', 'al', 'at', 'em', 'os', 'eg', 'og', 'um', 'un', 'ant', 'enk', 'atl',
                'ono', 'oso', 'osu', 'asa', 'as', 'deo', 'dul', 'mol', 'us', 'ees', 'am', 'an', 'ane', 'one', 'ami', 'ien', 'ien',
                'onne', 'ento', 'anka', 'aka', 'oco', 'ecce', 'uta', 'espa', 'ago', 'aga', 'age'];


const word = [];
const prefix = ['', 'Sir ', 'Madame ', 'Master ', 'Duke ', 'King ', 'Count ', 'Warlord ', 'Ranger ',
'Caesar ', 'Imperator ', 'Senator ', 'One-Eyed ', '', 'Emperor ', 'Captain ', 'Crow Eyed ', 'Honorable ', 'Adjudicator ', 'Dragon Rider ', 'Hieromonk ', '', '', '', '', '', '',
'', 'Chief ', 'Khan ', 'Great Khan ', 'Negus ', 'Chieftain ', 'Old Man ', 'Lord ','Lord-Ruler ','Horse Lord ','Queen ',
'Chieftess ', 'Holy King ','Holy Emperor ', 'Child King ','', '', '','','Father ',
'','','','', '', '', '', '', '', '','','','','', '','','','', '', '', '', '', '', '','','','',''];
const lastname = ['',' ' + generateName(2,6).toUpperCase(), ' ' + generateName(2,6).toUpperCase(), ' ' +  generateName(2,6).toUpperCase(), 
' ' +  generateName(2,6).toUpperCase(), ' ' +  generateName(2,6).toUpperCase(),
'','','','', '', '', '', '', '', '','','','',''];
const suffix = ['', ' I', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII',
'','', '','','','', 
'','','','', '', '', '', '', '', ''];
const title = ['', ' the Warrior', ' the Builder', ' the Madman', ' the Maiden', ' the Barbarian',
    ' the Freak', ' the Rogue', '', ' the Bandit', ' the Fisher', ' the Monk', ' the Thief',
    ' the Peasant', ' Lowborn', ' Highborn', ' the Bear', ' the Wolf', ' the Magpie',
    ' the Goblin', '', ' the Drunk', ' the Menace', ' the Docile', ' Cleaver', ' the Nightingale', 
    ' the Mudded', ' Woebegotten', ' the Lucky', ' the Small', ' the Big', ' the Unwanted', 
    ' born-Tough', ' the Eagle-Eyed', ' the Sleepy', ' the Poor', ' the Smiling',
    ' the Northman', ' the Easterling', '', ' Silver-Spooned', ' the Exorcist',
    ' the Artist', ' the Fighter', '', ' Tells-No-Tales', ' the Lemon', ' of-the-Moon',
    ' of-the-Stars', ' of-the-Sun', ' Big-Boned', ' the Hairless', ' the Craven', ' the Brave',
    ' the Long-Seer', ' Future-Sight', ' the Hero', ' the Legend', ' the Greybeard',
    ' Darkstalker', ' Evil-Eye', ' the Ogre', ' the Goose', ' the Duck', ' the Fox', ' the Nimble', ' the Dragon',
    ' the Alchemist', ' the Scholar', ' the Mourner', ' the Woeful', ' the Baneful', ' Destined-for-Death',
    ' Never-Born', ' Who-Walks-In-Death', ' the Left Behind', ' the Tamer', ' the Beast Hunter',
    ' of the Mountains', ' of the Joust', ' the Pious', ' the Sword of the Stars', ' the Faithful',
    ' the Frowner', ' the Drowned', ' the Brown-Eye', ' the Seer', '', '', '', '',
    ' the Blue-Faced', ' the Green', ' the Blackheart', ' the Lionheart', ' the Unready',
    ' the Great', ' the Conqueror', ' the Wanderer', ' the Forlorn', ' Misquoted', ' the Lecher',
    ' the Snake', ' the Unruly', ' the Bastard', ' the She-Wolf', ' the Sword of the Night',
    ' the Widow', ' the Black', ' the Yellow Knight', ' the Golden', ' the Erudite', ' the Student',
    ' of Utmost Devotion', ' the Sweet', ' the Bard', ' the Low', ' the Unknown', ' of High Halls',
    ' the Child',' the Boy Conqueror','','', '', '', '', '', '', '','','','','', '','','','', '', '', '', '', '', '','','','',''];

const weapon = ['Spear', 'Sword and Shield', 'Bow', 'Polearm', 'Axe', 'Whips', 'Mace',
                'Morningstar', 'Falchion', 'Daggers', 'Crossbow', 'Greatsword', 'Greataxe',
                'Fists', 'Greatspear', 'Bastard Sword', 'Broadsword', 'Arakh', 'Scythe', 'Flail',
                'Bloodletter', 'Axe of the Fallingstar Beast', 'Dragon Tail', 'Metal Chunk',
                'Sword of the Darkstalker', 'Lion Tail', 'Rock-spear', 'Sling', 
                'Glass Dagger', 'Iron Menhir', 'Caestus', 'Weevil Dagger', 'Ball and Chain',
                'Rapier', 'Longsword', 'Poisoned Knives', 'Crystal Knife', 'Lightning Rod', 
                'Staff', 'Tree Branch', 'Rock', 'None', 'Dual Sickles', 'Fire Magic', 
                'Ice Magic', 'Light Magic', 'Dark Magic', 'Shadow Magic', 'Earth Magic',
                'Widowmaker', 'Rusted Chain', 'Lightning Spear', 'Ice Pick', 'Holy Flail'];

const place = ['village', 'town', 'land', 'castle', 'tribe',
 'plains', 'cliffs', 'fortress', 'forest', 'isle', 'bay', 'jungle', 'kingdom', 'empire', 'steppe', 'hills',
 'eternal city', 'underground city', 'caverns', 'hidden village', 'hidden fortress', 'tower', 'stronghold'];

function alignment() {
    switch(getRandomInt(1,10)){
        case 1:
            return 'True Neutral';
            break;
        case 2:
            return 'Lawful Neutral';
            break;
        case 3:
            return 'Neutral Good';
            break;
        case 4:
            return 'Chaotic Good';
            break;
        case 5:
            return 'Lawful Evil';
            break;
        case 6:
            return 'Neutral Evil';
            break;
        case 7:
            return 'Lawful Good';
            break;
        case 8:
            return 'Chaotic Evil';
            break;
        case 9:
            return 'Chaotic Neutral';
    }

}

function generateName(sel) {
    var choice = sel;
    switch (choice) {
        case 1: 
            return name1[getRandomInt(0,name1.length)] + generateWord(getRandomInt(2,5));
            break;
        case 2:
            return name1[getRandomInt(0,name1.length)] + name2[getRandomInt(0,name2.length)];
            break;
        case 3:
            return name1[getRandomInt(0,name1.length)] + name2[getRandomInt(0,(name2.length)/2)] + name3[getRandomInt(0,(name3.length)/2)];
            break;
        case 4:
            return name1[getRandomInt(0,name1.length)] + name2[getRandomInt(0,(name2.length)/2)] + name3[getRandomInt(0,(name3.length)/2)] + name2[getRandomInt(0,(name2.length)/4)];
            break;
        case 5:
            return name1[getRandomInt(0,name1.length)] + name2[getRandomInt(0,(name2.length)/2)] + name3[getRandomInt(0,(name3.length)/4)] + name3[getRandomInt(0,name3.length)];
            break;
    }

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    // The maximum is exclusive and the minimum is inclusive
}

function generateWord(len) {
    length = getRandomInt(3,len);
    
        for (let i = 0; i<length; i++){
            word[i] = letters[getRandomInt(0,letters.length)];
            if(i%2){
                word[i] = vowels[getRandomInt(0,vowels.length)];
            }
        }
    //console.log(word);
    let final = word.join('');        
    word.length = 0;
    return final;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('char')
		.setDescription('MUDbot will generate a FANTASTICAL character for you!'),
	async execute(interaction) {
        
        
		await interaction.reply('*I created this character:* ' 
        + '\n--------------------------------------------------' 
        + '\n*Name:* **' 
        + prefix[getRandomInt(0,prefix.length)] + generateName(getRandomInt(1,6)).toUpperCase() + suffix[getRandomInt(0,suffix.length)] 
        + lastname[getRandomInt(0,lastname.length)] + title[getRandomInt(0,title.length)] 
        + '**\n*Child of ' + prefix[getRandomInt(0,prefix.length)] + generateName(getRandomInt(1,6)) + ' and ' + prefix[getRandomInt(0,prefix.length)] + generateName(getRandomInt(1,6))
        + suffix[getRandomInt(0,suffix.length)] + title[getRandomInt(0,title.length)]
        + '*\n*Weapon:* ' + weapon[getRandomInt(0,weapon.length)] 
        + '\n*Str:* ' + getRandomInt(0,15) 
        + '\n*Dex:* ' + getRandomInt(0,15)
        + '\n*Int:* ' + getRandomInt(0,15)
        + '\n*Faith:* ' + getRandomInt(0,15)
        + '\n*Luck:* ' + getRandomInt(0,15)
        + '\n*Prestige:* ' + getRandomInt(0,101)
        + '\n*Alignment:* **' + alignment() + '**'
        + '\nFrom the **' + place[getRandomInt(0,place.length)] + '** of **' + generateWord(8).toUpperCase() + '**'
        + '\n--------------------------------------------------');
     
	},
    
};