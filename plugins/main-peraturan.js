const { MessageType } = require('@adiwajshing/baileys');

const handler = async (m, { conn }) => {
    const menu = `
╭─「 Rules Group 」
│
│ • Dilarang Spam
│ • Dilarang Promosi
│ • Hormati Member Lain
│ • Gunakan Bahasa yang Sopan
│
│ Ketik *!menu* untuk melihat daftar perintah!
╰───────
    `.trim();

    await conn.sendMessage(m.chat, menu, MessageType.text, { quoted: m });
};

handler.help = ['rules'];
handler.tags = ['group'];
handler.command = /^rules$/i;

module.exports = handler;