let handler = async (m, { conn, text }) => {
    let data = readDataClan();
    let user = global.db.data.users[m.sender];
    
    if (!text) return conn.reply(m.chat, 'Masukkan nama clan yang ingin dibuat.', m);
    if (user.clan) return conn.reply(m.chat, 'Kamu sudah bergabung dengan clan.', m);
    if (user.money < 1000000000) return conn.reply(m.chat, 'Uang kamu tidak cukup untuk membuat clan. Butuh 1B (1,000,000,000) money.', m);

    let clanName = text.trim();
    let clanId = 'clan_' + Date.now();

    data.clans[clanId] = {
        name: clanName,
        leader: m.sender,
        members: [m.sender],
        level: 1,
        points: 0
    };

    data.users[m.sender] = {
        name: conn.getName(m.sender),
        clan: clanId
    };

    user.clan = clanId;
    user.money -= 1000000000;

    writeDataClan(data);

    conn.reply(m.chat, `Clan "${clanName}" berhasil dibuat dengan biaya 1B money!`, m);
}

handler.help = ['createclan <name>'];
handler.tags = ['rpg'];
handler.command = /^(createclan|buatclan)$/i;

module.exports = handler;