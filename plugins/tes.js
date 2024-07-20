const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn }) => {
    const adReply1 = {
        title: 'Iklan Eksternal 1',
        body: 'Ini adalah iklan eksternal pertama',
        thumbnailUrl: 'https://example.com/iklan1.jpg',
        sourceUrl: 'https://example.com/iklan1',
        mediaType: MessageType.image,
        renderLargerThumbnail: true
    };

    const adReply2 = {
        title: 'Iklan Eksternal 2',
        body: 'Ini adalah iklan eksternal kedua',
        thumbnailUrl: 'https://example.com/iklan2.jpg',
        sourceUrl: 'https://example.com/iklan2',
        mediaType: MessageType.image,
        renderLargerThumbnail: true
    };

    await conn.reply(m.chat, 'Ini adalah pesan dengan dua iklan eksternal', m, {
        contextInfo: {
            externalAdReply: [adReply1, adReply2]
        }
    });
};

handler.command = ['test'];
handler.tags = ['admin'];
handler.help = ['test'];
handler.owner = true;

module.exports = handler;