let handlerStop = async (m, { conn, isOwner }) => {
    if (!isOwner) {
        return conn.reply(m.chat, '*Kamu tidak memiliki izin untuk menjalankan perintah ini.*', m);
    }

    if (!isRunning) {
        return conn.reply(m.chat, '*Sistem randomchat tidak sedang berjalan.*', m);
    }

    isRunning = false;
    conn.reply(m.chat, '*Sistem randomchat telah dihentikan.*', m);
};

handlerStop.help = ['stoprandomchat'];
handlerStop.tags = ['owner'];
handlerStop.command = /^(stoprandomchat)$/i;

handlerStop.owner = true;

module.exports = handlerStop;