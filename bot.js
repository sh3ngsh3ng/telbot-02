const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const fs = require('fs')

let bot;

const token = process.env.API_KEY


if (process.env.NODE_ENV === 'SERVER') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.SERVER + token);
    console.log("Bot is live")
} else {
    bot = new TelegramBot(token, { polling: true })
}


console.log(`Bot is started in the ${process.env.NODE_ENV} mode`);


bot.on('message', async (msg) => {
    if (msg.text == '/start') {
        bot.sendMessage(
            msg.chat.id,
            `
Hello ${msg.chat.username}!
\nInterested in making a bot that sends your friends/lover/family uploaded photos? Or interested in making a photo diary?
\nI am a demo bot built to show you how it works! 
\nYou can try me by using /getphoto
            `
        )
    }

    if (msg.text == '/getphoto') {
        let captions = [
            'Do you remember the first time we met? It was at the airport. When I first saw you, I was instantly mesmerized. How could someone be so beautiful?',
            'Remember this place? This was where we took out first holiday together!',
            'I love you so much and pledge to give you my heart!'
        ]
        for (let i = 0; i < 3; i++) {
            await bot.sendPhoto(msg.chat.id, fs.readFileSync(`./photos/photo-${i}.jpg`), {
                caption: captions[i]
            })
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
})