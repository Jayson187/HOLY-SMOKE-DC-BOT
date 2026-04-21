const { Client, GatewayIntentBits } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const TOKEN = "HIER_DEIN_TOKEN";

// einfache Sätze
const sentences = [
  "ist neu hier 😎",
  "hat den Server betreten 🚀",
  "bringt gute Laune mit ✨",
  "ist jetzt dabei 🔥"
];

client.on('guildMemberAdd', async member => {

  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

  const canvas = createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  const background = await loadImage('https://cdn.discordapp.com/attachments/1217533139069435975/1495491628536954890/ChatGPT_Image_18._Apr._2026_18_46_05.png?ex=69e86add&is=69e7195d&hm=7736e44573fdd42a350bd4357e311e0ee9493fa902374f52f796bf70fdec6685&');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Willkommen ${member.user.username}`, 50, 100);
  ctx.fillText(randomSentence, 50, 150);

  const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png' }));
  ctx.drawImage(avatar, 500, 50, 128, 128);

  const attachment = {
    attachment: canvas.toBuffer(),
    name: 'welcome.png'
  };

const channel = member.guild.channels.cache.get("1484868318048292972");

  if (channel) {
    channel.send({
      content: `👋 Willkommen ${member}! ${member.user.username} ${randomSentence}`,
      files: [attachment]
    });
  }
});

client.login(TOKEN);