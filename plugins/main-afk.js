
let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  let caption = `@${m.sender.split("@")[0]} Now AFK${text ? ': ' + text : ''}`
  conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: namebot,
                body: wm,
                thumbnailUrl: thumb,
                sourceUrl: sig,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}
handler.help = ['afk *[reason]*']
handler.tags = ['main']
handler.command = /^afk$/i
handler.limit = true

module.exports = handler