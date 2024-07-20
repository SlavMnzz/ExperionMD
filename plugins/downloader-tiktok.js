const fetch = require('node-fetch');

let handler = async (m, { conn, args, command, isGroup }) => {
    let q = args[0];

    switch (command) {
        case 'tiktok':
            if (!q) return conn.reply(m.chat, 'Link nya mana?', m);
            conn.sendSticker(m.chat, stikot, m);
            try {
                let e = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=${api.Lol}&url=${q}`);
                let eJson = await e.json();
                let ee = `*DOWNLOADER TIKTOK*\n ketik .ttaudio jika ingin mengunduh audio nya`;
                await conn.sendMessage(m.chat, { video: { url: eJson.result.link }, caption: ee }, { quoted: m });
            } catch (err) {
                conn.reply(m.chat, 'Terjadi kesalahan, coba lagi nanti.', m);
            }
            break;

        case 'ttmp3':
        case 'tiktokaudio':
        case 'ttaudio':
            if (!isGroup) return conn.reply(m.chat, 'Hanya dapat digunakan di grup.', m);
            if (!q) return conn.reply(m.chat, 'Link nya mana?', m);
            conn.reply(m.chat, mess.wait, m);
            try {
                let i = await fetch(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${api.Lol}&url=${q}`);
                let iJson = await i.json();
                await conn.sendMessage(m.chat, { audio: { url: iJson.result }, mimetype: 'audio/mp4' }, { quoted: fkontak });
            } catch (err) {
                conn.reply(m.chat, 'Terjadi kesalahan, coba lagi nanti.', m);
            }
            break;
    }
};

handler.help = ['tiktok', 'ttmp3', 'tiktokaudio', 'ttaudio'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|ttmp3|tiktokaudio|ttaudio)$/i;
handler.limit = true;
handler.group = false;

module.exports = handler;