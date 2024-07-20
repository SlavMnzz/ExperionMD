let fs = require('fs');

let handler = async (m, { conn, text }) => {
  let total = Math.floor(Math.random() * 999999999999999999999999999999);
  let json = { exp: total };

  // Assuming 'sig' is defined somewhere in your environment
  let sig = "https://example.com"; // Replace with your actual source URL

  // Here we integrate the conn.reply function
  conn.reply(m.chat, `Upah yang antum dapatkan adalah\n*${json.exp}* XP & LIMIT`, m, {
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

  conn.mining = conn.mining ? conn.mining : {};
  conn.mining[m.chat] = true;

  // Assuming global.db.data.users[m.sender] exists and has exp and limit fields
  global.db.data.users[m.sender].exp += json.exp * 1;
  global.db.data.users[m.sender].limit += json.exp * 1;
};

handler.help = ['kerja'];
handler.tags = ['rpg'];
handler.command = /^kerja|nguli/i;
handler.owner = false;
handler.mods = false;
handler.premium = true;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.limit = true;

module.exports = handler;