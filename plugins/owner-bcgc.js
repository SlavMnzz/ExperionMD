const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text, participants }) => {
    let groups = Object.entries(conn.chats)
        .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce)
        .map(v => v[0]);

    let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
    let teks = text ? text : cc.text;

    const adReply = {
        title: 'Nama Bot',
        body: '',
        thumbnailUrl: 'https://telegra.ph/file/d55855ccf2c4fa4892784.jpg',
        sourceUrl: 'https://example.com', // Ganti dengan URL sumber yang sesuai
        mediaType: MessageType.image,
        renderLargerThumbnail: true
    };

    await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m, {
        contextInfo: {
            externalAdReply: adReply
        }
    });

    for (let id of groups) {
        let participantIds = participants.map(a => a.id);
        await conn.sendMessage(id, teks, MessageType.text, {
            contextInfo: {
                mentionedJid: participantIds,
                externalAdReply: adReply
            }
        }).catch(_ => _);
    }

    await conn.reply(m.chat, `Selesai Broadcast ${groups.length} Group`, m, {
        contextInfo: {
            externalAdReply: adReply
        }
    });
};

handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' *[message]*');
handler.tags = ['owner'];
handler.command = /^(broadcast|bc)(group|grup|gc)$/i;
handler.owner = true;

module.exports = handler;