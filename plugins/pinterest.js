const { pinterest } = require('../lib/scraper');

let handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) {
    return m.reply(`Example: ${usedPrefix + command} car`);
  }

  try {
    let results = await pinterest(text);
    if (results.length === 0) {
      return m.reply('No results found.');
    }

    let result = results[Math.floor(Math.random() * results.length)];
    conn.sendMessage(m.chat, { image: { url: result }, caption: `*Pinterest:* ${text}`}, {quoted: m});
  } catch (error) {
    console.error(error);
    m.reply('Error occurred');
  }
};

handler.help = ['pinterest'].map(a => a + ' *[query]*');
handler.tags = ['tools', 'internet'];
handler.command = /^(pinterest|pin)$/i;

module.exports = handler;