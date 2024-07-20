let handler = async (m, { conn, text }) => {
    let data = readDataClan();
    let user = global.db.data.users[m.sender];
    if (user.clan) return conn.reply(m.chat, 'Kamu sudah bergabung dengan clan.', m);

    let clanName = text.trim();
    let clan = Object.values(data.clans).find(c => c.name.toLowerCase() === clanName.toLowerCase());

    if (!clan) return conn.reply(m.chat, 'Clan tidak ditemukan.', m);

    clan.members.push(m.sender);
    data.users[m.sender] = {
        name: conn.getName(m.sender),
        clan: clanId
    };
    user.clan = clanId;

    writeDataClan(data);

    conn.reply(m.chat, `Kamu berhasil bergabung dengan clan "${clan.name}"!`, m);
}

handler.help = ['joinclan <name>'];
handler.tags = ['rpg'];
handler.command = /^(joinclan|bergabungclan)$/i;

module.exports = handler;