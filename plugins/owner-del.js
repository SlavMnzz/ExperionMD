let handler = async (m, { conn, isOwner, command }) => {
    if (!isOwner) {
        return conn.reply(m.chat, '*Kamu tidak memiliki izin untuk menjalankan perintah ini.*', m);
    }

    if (!m.quoted) {
        return conn.reply(m.chat, '*Reply pesan yang ingin dihapus dengan perintah .del*', m);
    }

    try {
        await conn.deleteMessage(m.chat, {
            fromMe: true,
            id: m.quoted.id,
            remoteJid: m.chat
        });

        await conn.deleteMessage(m.chat, {
            fromMe: true,
            id: m.id,
            remoteJid: m.chat
        });
    } catch (err) {
        console.error(err);
        return conn.reply(m.chat, '*Terjadi kesalahan saat menghapus pesan.*', m);
    }
};

handler.help = ['del'];
handler.tags = ['owner'];
handler.command = /^(del)$/i;

handler.owner = true;

module.exports = handler;