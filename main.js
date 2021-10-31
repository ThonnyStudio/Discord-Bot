const Discord = require('discord.js')
const client = new Discord.Client()
var config = require("./config.json")

client.on('ready', () =>{
    console.log(`Привет! ${client.user.tag} запустился!`)
})

client.on('message', message =>{
    if (message.author.bot) return;
    if (message.content == `${config.PREFIX}пригласить`) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Добавить бота на свой сервер")
    embed.setDescription(`Пригласить бота ты сможешь [тут](https://discord.com/oauth2/authorize?client_id=${ config.ClientId }&scope=bot%20applications.commands&permissions=2147483647)!`)
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL())
    message.channel.send(embed)
    }
})

client.on('message', message =>{
    if (message.author.bot) return;
    if (message.content == `${config.PREFIX}профиль`) {
    let embed = new Discord.MessageEmbed()
    .setTitle(message.author.username)
    let status = ''
    switch (message.author.presence.status) {
        case 'online':
            status = 'онлайн'; break; 
            case 'idle':
                status = ':orange_circle:нет на месте'; break;
                case 'offline':
                    status = 'нет в сети'; break;
                    case 'dnd':
                        status = ':red_circle:не беспокоить'; break;
    }
    embed.setDescription(`**Ваш дискорд айди: ${message.author.id}
    Ваш статус: ${status}
    Дата создания аккаунта: ${message.author.createdAt.toLocaleDateString()}
    Дата входа на сервер: ${message.member.joinedAt.toLocaleDateString()}
    **`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL())
    message.channel.send(embed)
    }
})

client.on('messageDelete', message =>{
    let embed = new Discord.MessageEmbed()
    .setTitle('Было удалено сообщение!')
    .setColor('RANDOM')
    .addField(`Удалённое сообщение:`, message.content, true)
    .addField("Автор:",`${message.author.tag} (${message.author})`,true)
    .addField("Канал:", `${message.channel}`, false)
    .setFooter(' - ',`${message.author.avatarURL()}`)
    .setTimestamp(message.createdAt);
  client.channels.cache.get(config.MOD_LOG_ID).send(embed);
})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Привет, ${member.user.username}!`)
    .setDescription(`**Ты попал на мой сервер!
    Ты наш \`${client.guilds.get("АЙДИ СЕРВЕРА").memberCount}\` участник! **`)
    .setFooter('Будь всегда на позитиве :3', 'https://cdn.discordapp.com/emojis/590614597610766336.gif?v=1')
    .setColor('RANDOM')
    member.send(embed);

    let embed2 = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Пользователь вошел на сервер`)
    .addField('Пользователь:', member.user)
    .setColor('RANDOM')
    member.send(embed);
    client.channels.cache.get(config.MOD_LOG_ID).send(embed2)
})

client.on('guildMemberRemove', member => {
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Пользователь покинул сервер`)
    .addField('Пользователь:', member.user)
    .setColor('RANDOM')
    member.send(embed);
    client.channels.cache.get(config.MOD_LOG_ID).send(embed)
  })

async function change() {
    let members = client.guilds.cache.get(config.SupportServerId).memberCount
    client.channels.cache.get(config.Users_Size_VoiceId).setName(`На сервере: ${members} участников`);
}

var interval = setInterval(function () { change(); }, 20000  );

client.login(config.TOKEN);