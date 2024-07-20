const { MessageType } = require('@whiskeysockets/baileys');

const timeout = 604800000;

let handler = async (m, { conn, usedPrefix, text }) => {
    let time = global.db.data.users[m.sender].lastmulung + 604800000;
    if (new Date() - global.db.data.users[m.sender].lastmulung < 604800000) {
        let remainingTime = time - new Date();
        let remainingTimeString = msToTime(remainingTime);
        throw `📮 Anda sudah merampok bank\nTunggu selama ⏲️ ${remainingTimeString} lagi`;
    }

    let botolnye = `${Math.floor(Math.random() * 30000)}`.trim();
    let kalengnye = `${Math.floor(Math.random() * 999)}`.trim();
    let kardusnye = `${Math.floor(Math.random() * 1000)}`.trim();

    global.db.data.users[m.sender].money += botolnye * 1;
    global.db.data.users[m.sender].exp += kalengnye * 1;
    global.db.data.users[m.sender].kardus += kardusnye * 1;
    global.db.data.users[m.sender].lastmulung = new Date() * 1;

    // Kirim pesan dengan iklan eksternal setelah mendapatkan hasil rampokan
    conn.reply(m.chat, `Selamat kamu mendapatkan : \n💰+${botolnye} Money\n📦+${kardusnye} Kardus\n✨+${kalengnye} Exp`, m, {
        contextInfo: {
            externalAdReply: {
                title: namebot,
                body: "",
                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                sourceUrl: sig, // Ganti dengan URL sumber iklan
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });

    // Set timeout untuk mengizinkan operasi ini dapat dilakukan kembali setelah batas waktu berakhir
    setTimeout(() => {
        conn.reply(m.chat, `Yuk waktunya Maling lagi 👋…`, m, {
            contextInfo: {
                externalAdReply: {
                    title: namebot,
                    body: "",
                    thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                    sourceUrl: sig, // Ganti dengan URL sumber iklan
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }, timeout);
};

handler.help = ['maling'];
handler.tags = ['rpg'];
handler.command = /^(maling)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.limit = true; // Anda membatasi handler ini hanya bisa digunakan sekali sebelum timeout
handler.exp = 0;
handler.money = 0;

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " jam " + minutes + " menit " + seconds + " detik";
}