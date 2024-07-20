let handler = async (m, { conn, text, usedPrefix, command }) => {
const user = global.db.data.users[m.sender]
const lastDeliveryTime = user.lastredeem || 0;
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastDeliveryTime
if (timeDiff < 3000000) {
    const remainingTime = 300000 - timeDiff;
    const remainingTimeString = clockString(remainingTime);
    conn.reply(m.chat, `Kamu Telah Melakukan Redeem`, m, {
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
    return;
  }
 if (!text) throw `*• Contoh:* .claimredeem ${db.data.redeem}`
let redeem = db.data.redeem
if (text == redeem) {
user.limit = 1000
user.exp = 11000
user.money = 1000000000
user.lastredeem = Date.now()
conn.reply(m.chat, `🎉 Terimakasih Kamu Mendapat\n\nlimit: 1000\nexp: 11000\nmoney: 1000000000\n*By Gerry MultiDevice*`, m, {
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
} else conn.reply(m.chat, '*[ Kode Redeem Salah ]*', m, {
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
handler.help = ["claimredeem"].map(a => a + ' *[code redeem]*')
handler.tags = ["rpg"]
handler.command = ["claimredeem"]
module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n' + d, ' *Days*\n ', h, ' *Hours*\n ', m, ' *Minute*\n ', s, ' *Second* '].map(v => v.toString().padStart(2, 0)).join('');
}