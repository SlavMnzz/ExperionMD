let { MessageType } = require('@whiskeysockets/baileys');

const miningxp = 5000;
const miningmoney = 5000;
const mininglimit = 10;
const timeout = 3600000;

let handler = async (m, { conn, usedPrefix, text }) => {
    let time = global.db.data.users[m.sender].lastmining + 3600000;
    if (new Date - global.db.data.users[m.sender].lastmining < 3600000) {
        throw `Anda sudah mengambil hadiah\ntunggu selama ${msToTime(time - new Date())} lagi`;
    }

    let limitt = `${Math.floor(Math.random() * 15)}`.trim();
    let xpee = `${Math.floor(Math.random() * 5000)}`.trim();
    let moneyy = `${Math.floor(Math.random() * 5000)}`.trim();

    global.db.data.users[m.sender].limit += limitt * 1;
    global.db.data.users[m.sender].exp += xpee * 1;
    global.db.data.users[m.sender].money += moneyy * 1;
    global.db.data.users[m.sender].lastmining = new Date() * 1;

    // Kirim pesan dengan iklan eksternal
    conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${xpee} XP\n+${moneyy} Money\n+${limitt} Limit`, m, {
        contextInfo: {
            externalAdReply: {
                title: namebot,
                body: "",
                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                sourceUrl: "https://example.com", // Ganti dengan URL sumber iklan
                mediaType: 1, // 1 untuk gambar
                renderLargerThumbnail: true
            }
        }
    });

    setTimeout(() => {
        conn.reply(m.chat, `Hadiah sudah bisa didapatkan kembali`, m);
    }, timeout);
};

handler.help = ['hadiah'];
handler.tags = ['rpg'];
handler.command = /^(hadiah)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.limit = false;
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