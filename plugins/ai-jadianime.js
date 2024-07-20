const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

const handler = async (m, { conn, usedPrefix, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .toanime';

  conn.reply(m.chat, 'Sedang mengkonversi gambar... Mohon tunggu sebentar', m);

  try {
    let media = await q.download();
    let url = await uploadImage(media);
    let response = await fetch(`https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.lolkey}&img=${url}`);
    if (!response.ok) throw 'Terjadi kesalahan saat mengkonversi gambar';
    
    let hasil = await response.buffer();
    await conn.sendFile(m.chat, hasil, '', 'Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan', m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Maaf, terjadi kesalahan. Mohon coba lagi nanti.', m);
  }
};

handler.help = ['toanime', 'jadianime'];
handler.tags = ['anime', 'ai'];
handler.command = /^(jadianime|toanime)$/i;
handler.premium = true;

module.exports = handler;