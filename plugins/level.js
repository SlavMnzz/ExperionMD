let handler = async (m, { conn, text }) => {
    let user = m.mentionedJid[0] ? global.db.data.users[m.mentionedJid[0]] : global.db.data.users[m.sender];
    let mentionedUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let username = conn.getName(mentionedUser);

    if (!user) {
        return conn.reply(m.chat, 'Pengguna tidak ditemukan dalam database.', m);
    }

    let { level, exp, money, bank, limit, premium, banned, totalInv, health, armor, cupon, expG, tiketM, tiketCoin } = user;

    // Hitung XP yang diperlukan untuk naik level
    const baseExp = 5000; // XP dasar yang dibutuhkan untuk level 1
    let requiredExp = baseExp * (level + 1); // XP yang dibutuhkan untuk naik ke level berikutnya
    let progress = ((exp / requiredExp) * 100).toFixed(2); // Hitung progress dalam persen

    // Buat pesan informasi dalam format yang diinginkan
    let info = `╭─ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 𝗥𝗣𝗚
│ • @${username}
│ • Level: ${level}
│ • Exp: ${exp} / ${requiredExp} (${progress}%)
│ • Money: ${money}
│ • Bank: ${bank}
│ • Limit: ${limit}
│ • Premium: ${premium ? 'Ya' : 'Tidak'}
│ • Banned: ${banned ? 'Ya' : 'Tidak'}
│ • Total Inv: ${totalInv || 0}
│ • Health: ${health || 0}
│ • Armor: ${armor || 0}
│ • Cupon: ${cupon || 0}
│ • ExpG: ${expG || 0}
│ • TiketM: ${tiketM || 0}
│ • Tiket Coin: ${tiketCoin || 0}
│ • Progress: ${progress}%
╰────────────`;

    // Kirim pesan dengan informasi yang diformat
    conn.reply(m.chat, info, m, {
        mentions: [mentionedUser],
    });
}

handler.help = ['userinfo'];
handler.tags = ['rpg'];
handler.command = /^(userinfo|infouser|user)$/i;

module.exports = handler;