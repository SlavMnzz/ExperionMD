let handler = async (m, { conn }) => {
    if (new Date - global.db.data.users[m.sender].lastnguli > 86400000) {
      global.db.data.users[m.sender].limit += 10
      conn.reply(m.chat, '_Selamat kamu mendapatkan +10 limit_', m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
      global.db.data.users[m.sender].lastnguli = new Date * 1
    } else conn.reply(m.chat, 'Anda sudah mengklaim upah nguli hari ini', m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
  }
  handler.help = ['nguli']
  handler.tags = ['rpg']
  handler.command = /^(nguli)$/i
  handler.group = true
  handler.fail = null
  
  
  module.exports = handler