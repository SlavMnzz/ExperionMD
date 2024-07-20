const fs = require('fs');
const path = require('path');

// Ambil daftar owner dari konfigurasi bot
const { owner } = require('../settings'); // Pastikan path ini sesuai dengan konfigurasi bot Anda

let handler = async (m, { conn, text }) => {
    if (!owner.includes(m.sender)) {
        return conn.reply(m.chat, 'Perintah ini hanya dapat digunakan oleh owner.', m);
    }

    if (!text) {
        return conn.reply(m.chat, 'Silakan masukkan path file yang ingin diunduh.', m);
    }

    let filePath = path.resolve(text.trim());
    if (!fs.existsSync(filePath)) {
        return conn.reply(m.chat, 'File tidak ditemukan.', m);
    }

    try {
        let fileName = path.basename(filePath);
        await conn.sendMessage(m.chat, { document: { url: filePath }, fileName, mimetype: 'application/octet-stream' });
    } catch (error) {
        conn.reply(m.chat, 'Gagal mengirim file. Silakan coba lagi.', m);
    }
}

handler.help = ['download <file_path>'];
handler.tags = ['owner'];
handler.command = /^(download|unduh)$/i;

module.exports = handler;