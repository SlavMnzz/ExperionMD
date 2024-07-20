let isRunning = false;  // Variable to control the running state of the function

let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) {
        return conn.reply(m.chat, '*Kamu tidak memiliki izin untuk menjalankan perintah ini.*', m);
    }

    if (!isRunning) {
        return conn.reply(m.chat, '*Sistem autochat belum berjalan.*', m);
    }

    isRunning = false;  // Set the running state to false to stop autochat
    conn.reply(m.chat, '*Sistem autochat telah dihentikan.*', m);
};

handler.help = ['stopautochat'];
handler.tags = ['owner'];
handler.command = /^(stopautochat)$/i;

handler.owner = true;

module.exports = handler;