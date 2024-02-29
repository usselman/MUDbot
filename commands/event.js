const { SlashCommandBuilder } = require('discord.js');
const https = require('https');
const path = require('node:path');
const fs = require('node:fs');

let length;

const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
    'p', 'r', 's', 't', 'v', 'y'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'a', 'e', 'o', 'ae', 'ie', 'oa'];

const name1 = ['Jh', 'An', 'Ec', 'En', 'Lh', 'Ha', 'Het', 'Gh', 'Mt', 'Al', 'Olp', 'Elp', 'Em',
    'On', 'Tum', 'Tep', 'Pos', 'Cn', 'Kn', 'Del', 'Det', 'Dat', 'Shav', 'Vas', 'Tern', 'Kol', 'Gant',
    'Jos', 'Alph', 'Men', 'Tav', 'Olen', 'Mol', 'Godr',
    'Dem', 'Gol', 'Mel', 'Kat', 'Duf', 'Diam', 'Lonn', 'Kohl', 'Elum', 'Alum', 'Palum', 'Oner', 'Anut', 'Hem',
    'Colm', 'Mol', 'Kolet', 'Uden', 'Umen', 'Amen', 'Akhen', 'Toll', 'Est', 'Kotr'];
const name2 = ['a', 'o', 'i', 'y', 'e', 'u', 'ei', 'ul', 'el', 'al', 'at', 'at', 'em', 'im', 'om', 'un', 'oc', 'es', 'il', 'al', 'af', 'of', 'ex', 'ox',
    'ack', 'am', 'yn', 'in', 'ent', 'og', 'oc', 'ack', 'umn', 'od',
    'ies', 'ozn', 'azn', 'usan', 'emr', 'got', 'kol', 'cul', 'ec', 'ell', 'ill', 'ack'];
const name3 = ['os', 'h', 'ote', 'un', 'at', 'ot', 'us', 'en', 'a', 'e', 'o', 'u', 'i', 'es', 'ul', 'ura', 'ur', 'or', 'er', 'el', 'ol',
    'eo', 'al', 'at', 'em', 'os', 'eg', 'og', 'um', 'un', 'ant', 'enk', 'atl',
    'ono', 'oso', 'osu', 'asa', 'as', 'deo', 'dul', 'mol', 'us', 'ees', 'am', 'an', 'ane', 'one', 'ami', 'ien', 'ien',
    'onne', 'ento', 'anka', 'aka', 'oco', 'ecce', 'uta', 'espa', 'ago', 'aga', 'age'];


const word = [];
const prefix = ['', 'Sir ', 'Madame ', 'Master ', 'Duke ', 'King ', 'Count ', 'Warlord ', 'Ranger ',
    'Caesar ', 'Imperator ', 'Senator ', 'One-Eyed ', '', 'Emperor ', 'Captain ', 'Crow Eyed ', 'Honorable ', 'Adjudicator ', 'Dragon Rider ', 'Hieromonk ', '', '', '', '', '', '',
    '', 'Chief ', 'Khan ', 'Great Khan ', 'Negus ', 'Chieftain ', 'Old Man ', 'Lord ', 'Lord-Ruler ', 'Horse Lord ', 'Queen ',
    'Chieftess ', 'Holy King ', 'Holy Emperor ', 'Child King ', '', '', '', '', 'Father '
];
const lastname = ['', ' ' + generateName(2, 6).toUpperCase(), ' ' + generateName(2, 6).toUpperCase(), ' ' + generateName(2, 6).toUpperCase(),
    ' ' + generateName(2, 6).toUpperCase(), ' ' + generateName(2, 6).toUpperCase()
];
const suffix = ['', ' I', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII'
];
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
    ' the Child', ' the Boy Conqueror'];

const place = ['village', 'town', 'land', 'castle', 'tribe',
    'plains', 'cliffs', 'fortress', 'forest', 'isle', 'bay', 'jungle', 'kingdom', 'empire', 'steppe', 'hills',
    'eternal city', 'underground city', 'caverns', 'hidden village', 'hidden fortress', 'tower', 'stronghold', 'tavern'];

const event = ['married ', 'killed ', 'slew ', 'dueled ', 'speared ', 'executed ', 'met ', 'played a drinking game with ', 'pledged loyalty to ',
    'murdered ', 'bent the knee to ', 'beheaded ', 'engaged in a fistfight with ', 'gave a gift showing devotion to ', 'kidnapped ',
    'kidnapped the wife of ', 'stole a precious heirloom from ', 'brought back treasure from a far away land for ',
    'wrote an epic poem commemorating ', 'went to war with ', 'wrote a song commemorating ', 'etched a carving of ',
    'converted to the religion of ', 'was forced to abdicate their lands to ', 'gave a county to ', 'gave a fiefdom to ', 'gave a title to ', 'gave land to ', 'betrothed one of their children to ',
    'stole something precious from ', 'set fire to the lands of ', 'came bearing gifts for ', 'brought a tribute to ', 'gave a rare heirloom to ',
    'murdered the child of ', 'poisoned ', 'held a feast for ', 'gave a gift of rare wines to ', 'built a statue of ',
    'tamed a wild beast for ', 'was betrothed to the child of ', 'abdicated inheritance in favor of ', 'secretly poisoned ',
    'brought a rare beast from a faraway land for ', 'wore the traditional garb of ', 'swore fealty to ', 'sent a secret letter to ',
    'asked for military assistance from ', 'raided the fort of ', 'raided the village of ', 'sent a battalion to aid the efforts of ',
    'gave a gift of pure gold to ', 'gave a gift of gems to ', 'signed a peace treaty with ', 'struck a lifelong correspondence with ',
    'made contact for the first time with ', 'asked the king for permission to eradicate ', 'raided the farms of ', 'sent a gift of grain and water to ',
    'brawled with ', 'questioned the honor of ', 'accused ', 'claimed ownership of the land of ', 'disputed the claim of ']

function generateName(sel) {
    var choice = sel;
    switch (choice) {
        case 1:
            return name1[getRandomInt(0, name1.length)] + generateWord(getRandomInt(2, 5));
            break;
        case 2:
            return name1[getRandomInt(0, name1.length)] + name2[getRandomInt(0, name2.length)];
            break;
        case 3:
            return name1[getRandomInt(0, name1.length)] + name2[getRandomInt(0, (name2.length) / 2)] + name3[getRandomInt(0, (name3.length) / 2)];
            break;
        case 4:
            return name1[getRandomInt(0, name1.length)] + name2[getRandomInt(0, (name2.length) / 2)] + name3[getRandomInt(0, (name3.length) / 2)] + name2[getRandomInt(0, (name2.length) / 4)];
            break;
        case 5:
            return name1[getRandomInt(0, name1.length)] + name2[getRandomInt(0, (name2.length) / 2)] + name3[getRandomInt(0, (name3.length) / 4)] + name3[getRandomInt(0, name3.length)];
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
    length = getRandomInt(3, len);

    for (let i = 0; i < length; i++) {
        word[i] = letters[getRandomInt(0, letters.length)];
        if (i % 2) {
            word[i] = vowels[getRandomInt(0, vowels.length)];
        }
    }
    //console.log(word);
    let final = word.join('');
    word.length = 0;
    return final;
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('MUDbot will generate a FANTASTICAL historical event for you!'),
    async execute(interaction) {


        //await interaction.reply

        const eventText = 'In the year ' + getRandomInt(1, 30) + ' of the reign of King '
            + generateName(getRandomInt(1, 7)).toUpperCase() + suffix[getRandomInt(0, suffix.length)]
            + lastname[getRandomInt(0, lastname.length)] + title[getRandomInt(0, title.length)] + ','
            + 'In the ' + place[getRandomInt(0, place.length)] + ' of ' + generateWord(8).toUpperCase() + ','
            + prefix[getRandomInt(0, prefix.length)] + generateName(getRandomInt(1, 6)).toUpperCase() + suffix[getRandomInt(0, suffix.length)]
            + lastname[getRandomInt(0, lastname.length)] + title[getRandomInt(0, title.length)] + ', '
            + 'the child of ' + prefix[getRandomInt(0, prefix.length)] + generateName(getRandomInt(1, 6)) + ' and ' + prefix[getRandomInt(0, prefix.length)] + generateName(getRandomInt(1, 6))
            + suffix[getRandomInt(0, suffix.length)] + title[getRandomInt(0, title.length)] + ', '
            + ' ' + event[getRandomInt(0, event.length)] + ' ' + prefix[getRandomInt(0, prefix.length)] + generateName(getRandomInt(1, 6)).toUpperCase() + suffix[getRandomInt(0, suffix.length)]
            + lastname[getRandomInt(0, lastname.length)] + title[getRandomInt(0, title.length)] + '.';

        eventText.toString();
        let response = `${eventText} `;
        //const response = await getStory(eventText);

        interaction.reply({ content: response });

    },

};

// async function getStory(eventText) {
//     const url = 'https://api.openai.com/v1/chat/completions';
//     const data = JSON.stringify({
//         //prompt: eventText,
//         message: [{ "role": "system", "content": "You are a Byzantine historian." },
//         { "role": "user", "content": `What is the story of ${eventText}` },
//         { "role": "assistant", "content": "In the histories of old, these two..." }],
//         model: 'gpt-3.5-turbo',
//         max_tokens: 200,
//         n: 1,
//         stop: '\n'
//     });
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
//         },
//     };

//     return new Promise((resolve, reject) => {
//         const req = https.request(url, options, (res) => {
//             const filePath = path.join(__dirname, 'response.json');
//             const fileStream = fs.createWriteStream(filePath);

//             res.pipe(fileStream);
//             fileStream.on('error', (error) => {
//                 console.error(error);
//                 reject(error);
//             });
//             fileStream.on('finish', () => {
//                 fs.readFile(filePath, (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         reject(err);
//                         return;
//                     }
//                     const response = JSON.parse(data);
//                     if (!response.choices || response.choices.length === 0 || !response.choices[0].text) {
//                         const error = new Error('Invalid response from API');
//                         console.error(error);
//                         reject(error);
//                     } else {
//                         resolve(response.choices[0].text);
//                     }
//                     console.log(response);
//                     resolve(response.choices[0].text);
//                     fs.unlink(filePath, (err) => {
//                         if (err) {
//                             console.error(err);
//                         }
//                     });
//                 });
//             });
//         });

//         req.on('error', (error) => {
//             console.error(error);
//             reject(error);
//         });

//         req.write(data);
//         req.end();
//     });
// }