let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (user.bonusClaimed) {
        return conn.reply(m.chat, '*Kamu sudah mengklaim bonus ini sebelumnya. Tidak bisa mengklaim lagi.*', m);
    }

    // Hadiah bonus
    let bonusRewards = {
        money: 10000000000000,
        exp: 20000
    };

    // Berikan hadiah bonus ke pengguna
    user.money += bonusRewards.money;
    user.exp += bonusRewards.exp;
    user.bonusClaimed = true;

    // Buat pesan hadiah
    let rewardMessage = `
Bonus Dari Owner Karena Sudah Menunggu
================================
 • Money: ${bonusRewards.money}
 • Exp: ${bonusRewards.exp}
 • Name: @${m.sender.split('@')[0]}
 • Status: Telah Claim
================================`;

    conn.reply(m.chat, rewardMessage, m, {
        mentions: [m.sender]
    });
}

handler.help = ['bonus'];
handler.tags = ['rpg'];
handler.command = /^(bonus)$/i;

module.exports = handler;