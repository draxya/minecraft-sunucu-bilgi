const moment = require('moment');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,] });

module.exports = client => {
  console.log(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.tag} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");

  var interval = setInterval (function activity() {
    var mcIP = 'oyna.aesirmc.com'
    var mcPort = 25565;
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;

    request(url, async function (err, response, body) {
      if (err) {
        console.log(err);
      }

      body = JSON.parse(body);
      var status = 'Sunucu şu an kapalı.';
      if (body.online) {
        if (body.players.now) {
          status = body.players.now + ' kullanıcı sunucuda!'
        } else {
          status = 'Sunucuda şu an kimse yok.'
        }
      }
      client.user.setActivity(status, { type: "PLAYING" })
    })
  }, 60 * 1000); 

};