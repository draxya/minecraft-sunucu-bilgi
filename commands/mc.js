const request = require('request');

exports.run = async function (message, args) {

    var mcIP = args[0];
    var mcPort = 25565;
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
    request(url, async function (err, response, body) {
        if (err) {
            console.log(err);
            return message.reply('Minecraft sunucunuzun istatistiğini çekerken bir hata oluştu....');
        }
        if (!mcIP) { return message.reply(`Lütfen bir sunucu IP'si girin.`) }
        body = JSON.parse(body);
        var status = 'Sunucu şu anda kapalı.';
        if (body.online) {
            status = 'Minecraft sunucunuz şu anda açık!  -  ';
            if (body.players.now) {
                if (body.motd) {

                    status += body.players.now + ' kullanıcı sunucuda!' + '\n```' + body.motd.replaceAll('§0', '').replaceAll('§1', '').replaceAll('§2', '').replaceAll('§3', '').replaceAll('§4', '').replaceAll('§5', '').replaceAll('§6', '').replaceAll('§7', '').replaceAll('§8', '').replaceAll('§9', '').replaceAll('§a', '').replaceAll('§b', '').replaceAll('§c', '').replaceAll('§d', '').replaceAll('§e', '').replaceAll('§f', '').replaceAll('§k', '').replaceAll('§l', '').replaceAll('§m', '').replaceAll('§n', '').replaceAll('§o', '').replaceAll('§r', '') + '```';;
                } else { status += body.players.now + ' kullanıcı sunucuda!' }
            } else {
                if (body.motd) {
                    status += 'Kimse sunucuda değil.' + '\n```' + body.motd.replaceAll('§0', '').replaceAll('§1', '').replaceAll('§2', '').replaceAll('§3', '').replaceAll('§4', '').replaceAll('§5', '').replaceAll('§6', '').replaceAll('§7', '').replaceAll('§8', '').replaceAll('§9', '').replaceAll('§a', '').replaceAll('§b', '').replaceAll('§c', '').replaceAll('§d', '').replaceAll('§e', '').replaceAll('§f', '').replaceAll('§k', '').replaceAll('§l', '').replaceAll('§m', '').replaceAll('§n', '').replaceAll('§o', '').replaceAll('§r', '') + '```';;
                } else { status += 'Kimse sunucuda değil.' }
            }
        }
        message.reply(status);
    });
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mc'],
    permLevel: 0
};
exports.help = {
    name: 'mc'
};