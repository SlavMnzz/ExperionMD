


let handler = async ({ conn, text, usedPrefix, command }) => {
  const uptime = process.uptime() * 1000;

  // Menggunakan fungsi clockString untuk format waktu
  const uptimeStr = clockString(uptime);

  // Respon dalam gaya yang diinginkan
  conn.reply(m.chat, `
*${namebot}*
has been active for *${uptimeStr}*
`, m, {
    contextInfo: {
      externalAdReply: {
        title: 'C A S I N O',
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.help = ["runtime", "uptime"].map(a => a + ' *[Time running]*')
handler.tags = ["info"]
handler.command = ["runtime", "uptime"]
module.exports = handler

function clockString(ms) {
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return [
    days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '',
    hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '',
    minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '',
    seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}` : ''
  ].filter(Boolean).join(', ');
}