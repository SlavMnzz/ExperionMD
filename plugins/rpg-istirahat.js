const healRate = 20; // Jumlah detik untuk mengisi nyawa dari 0 ke 100
const healPerSecond = 100 / healRate; // Jumlah nyawa yang dipulihkan per detik

const calculateHealTime = (currentHealth) => {
    const remainingHealth = 100 - currentHealth;
    return Math.ceil(remainingHealth / healPerSecond); // Waktu yang dibutuhkan dalam detik
};

let activeResting = {};

const healUser = async (conn, m, username, initialHealth) => {
    let user = global.db.data.users[username]; // Menggunakan global.db

    if (!user) {
        console.log(`User ${username} tidak ditemukan dalam database.`); // Log untuk debugging
        console.log('Struktur database saat ini:', JSON.stringify(global.db.data.users, null, 2)); // Log struktur database
        await conn.reply(m.chat, "User tidak ditemukan dalam database.", m);
        return;
    }

    activeResting[username] = true;
    const healTime = calculateHealTime(initialHealth);
    const startTime = Date.now();

    await conn.reply(m.chat, `@${username} sedang beristirahat dan nyawa akan bertambah. Dibutuhkan AFK (${healTime} detik) untuk mengumpulkan banyak nyawa.`, m, { contextInfo: { mentionedJid: [m.sender] } });

    let intervalId = setInterval(async () => {
        if (!activeResting[username]) {
            clearInterval(intervalId);
            const timeSpent = (Date.now() - startTime) / 1000;
            const healthGained = Math.ceil(timeSpent * healPerSecond);
            user.health = Math.min(initialHealth + healthGained, 100);
            global.db.data.users[username] = user; // Simpan perubahan ke database

            console.log(`User ${username} telah melakukan heal sebanyak ${healthGained} saat istirahat.`); // Log untuk debugging
            await conn.reply(m.chat, `@${username} kamu telah melakukan heal sebanyak ${healthGained} saat istirahat.`, m, { contextInfo: { mentionedJid: [m.sender] } });
            return;
        }

        user.health = Math.min(user.health + healPerSecond, 100);
        global.db.data.users[username] = user; // Simpan perubahan ke database

        if (user.health >= 100) {
            clearInterval(intervalId);
            await conn.reply(m.chat, `@${username} kamu sudah cukup beristirahat dan ayo waktunya survival lagi!`, m, { contextInfo: { mentionedJid: [m.sender] } });
            activeResting[username] = false;
        }
    }, 1000);
};

let handler = async (m, { conn }) => {
    const username = m.sender.split('@')[0];
    let user = global.db.data.users[username]; // Menggunakan global.db

    if (!user) {
        console.log(`User ${username} tidak ditemukan dalam database.`); // Log untuk debugging
        console.log('Struktur database saat ini:', JSON.stringify(global.db.data.users, null, 2)); // Log struktur database
        await conn.reply(m.chat, "User tidak ditemukan dalam database.", m);
        return;
    }

    if (activeResting[username]) {
        activeResting[username] = false; // Menghentikan istirahat jika sudah aktif
        console.log(`User ${username} menghentikan istirahat.`); // Log untuk debugging
        return;
    }

    console.log(`User ${username} memulai istirahat.`); // Log untuk debugging
    await healUser(conn, m, username, user.health);
};

handler.command = /^(istirahat)$/i;
module.exports = handler;