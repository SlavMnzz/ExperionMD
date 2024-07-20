let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (user.level < 5000) {
        return conn.reply(m.chat, '*Capai Level 5000 Untuk Claim Mastery*', m);
    }

    if (user.masteryClaimed) {
        return conn.reply(m.chat, '*Kamu sudah mengklaim hadiah Mastery. Tidak bisa mengklaim lagi.*', m);
    }

    // Hadiah mastery
    let masteryRewards = {
        money: 555555555555555555555555555555,
        limit: 999999999999,
        exp: 99999999999999999999
    };

    // Berikan hadiah mastery ke pengguna
    user.money += masteryRewards.money;
    user.limit += masteryRewards.limit;
    user.exp += masteryRewards.exp;
    user.masteryClaimed = true;

    // Buat pesan hadiah
    let rewardMessage = `Selamat @${m.sender.split('@')[0]}! Kamu telah mengklaim hadiah Mastery dan menerima:
    \n- Money: ${masteryRewards.money}
    \n- Limit: ${masteryRewards.limit}
    \n- Exp: ${masteryRewards.exp}`;

    conn.reply(m.chat, rewardMessage, m, {
        mentions: [m.sender]
    });
}

handler.help = ['mastery'];
handler.tags = ['mission'];
handler.command = /^(mastery)$/i;

module.exports = handler;