let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    conn.reply(m.chat, `${global.db.data.users[who].cupon} Your cupon\nCupon ini adalah sebuah hadiah dari owner\n\nCara menggunakan:\n/open cupon 1`, m, {
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
};
handler.help = ['cupon [@user]']
handler.tags = ['rpg']
handler.command = /^(cupon)$/i
handler.limit = true

module.exports = handler