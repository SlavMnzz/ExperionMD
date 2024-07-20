const fs = require('fs');

let handler = async (m, { conn }) => {
  let LastClaim = global.db.data.users[m.sender].lastclaim;
  let cdm = `${MeNit(new Date - LastClaim)}`;
  let cds = `${DeTik(new Date - LastClaim)}`;
  let cd1 = Math.ceil(44 - cdm);
  let cd2 = Math.ceil(59 - cds);

  if (new Date - global.db.data.users[m.sender].lastclaim > 2700000) {
    global.db.data.users[m.sender].uang += 7000;
    global.db.data.users[m.sender].exp += 100;

    conn.reply(m.chat, "ɴɪʜ ɢᴀᴊɪ ᴋᴀᴍᴜ 7.000", m, {
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

    global.db.data.users[m.sender].lastclaim = new Date * 1;
  } else {
    conn.reply(m.chat, `ᴋᴀᴍᴜ ᴛᴇʟᴀʜ ᴅɪɢᴀᴊɪ.\nᴛᴜɴɢɢᴜ ${cd1} ᴍᴇɴɪᴛ ${cd2} ᴅᴇᴛɪᴋ!`, m, {
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
}

handler.help = ['gaji', 'gajian'];
handler.tags = ['rpg'];
handler.command = /^(gaji|gajian)$/i;
handler.owner = false;
handler.mods = false;
handler.group = true;
handler.private = false;
handler.register = true;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 0;

module.exports = handler;

function JaM(ms) {
  let h = isNaN(ms) ? '60' : Math.floor(ms / 3600000) % 60;
  return [h].map(v => v.toString().padStart(2, 0)).join(':');
}

function MeNit(ms) {
  let m = isNaN(ms) ? '60' : Math.floor(ms / 60000) % 60;
  return [m].map(v => v.toString().padStart(2, 0)).join(':');
}

function DeTik(ms) {
  let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60;
  return [s].map(v => v.toString().padStart(2, 0)).join(':');
}