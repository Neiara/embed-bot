require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request-promise');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if(msg.content === process.env.PREFIX + "invite"){
        return msg.reply(`${process.env.SERVER_INVITE}`);
    }
    if(msg.content.startsWith(process.env.PREFIX + "embed")){
        const pasteBinLink = msg.content.substr(msg.content.indexOf(' ')+1);
        const pasteBinCode = pasteBinLink.substr(pasteBinLink.indexOf('pastebin.com/')+('pastebin.com/').length);
        const rawLink = `https://pastebin.com/raw/${pasteBinCode}`;
        try {
            const embedString = await request(rawLink);
            const embedData = JSON.parse(embedString);
            return msg.channel.send(embedData);
        }catch(err){
            console.error(err);
            return msg.reply(`Unable to build embed from link`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);