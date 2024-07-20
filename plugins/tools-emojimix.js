const fetch = require('node-fetch');
const { sticker } = require('../lib/sticker.js');
const fs = require('fs');

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0]) throw `*⛌ Masukan Emoji Yg ingin kamu gabungkan*\n\n*• Example:*\n- ${usedPrefix + command} 🐱+👻\n\n[ minimal 2 emoji ]`;
  
  let [emoji1, emoji2] = text.split('+');
  
  const anu = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
    .then(response => response.json());
  
  if (!anu.results || anu.results.length === 0) throw 'Kombinasi Emojimix Tidak Ditemukan';
  
  let emix = anu.results[0].media_formats.png_transparent.url;
  let stiker = await sticker(false, emix, global.packname, global.author);
  
  conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);
}

handler.help = ['emojimix'];
handler.tags = ['sticker'];
handler.command = /^(emojimix|emix)$/i;

module.exports = handler;