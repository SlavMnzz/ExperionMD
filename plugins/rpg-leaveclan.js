let handler = async (m, { conn }) => {
    let data = readDataClan();
    let user = global.db.data.users[m.sender];
    if (!user.clan) return conn.reply(m.chat, 'Kamu belum bergabung dengan clan.', m);

    let clan = data.clans[user.clan];
    if (clan.leader === m.sender) return conn.reply(m.chat, 'Kamu adalah pemimpin clan, kamu tidak bisa keluar.', m);

    clan.members = clan.members.filter(member => member !== m.sender);
    delete data.users[m.sender].clan;
    user.clan = null;

    writeDataClan(data);

    conn.reply(m.chat, `Kamu telah keluar dari clan "${clan.name}".`, m);
}

handler.help = ['leaveclan'];
handler.tags = ['rpg'];
handler.command = /^(leaveclan|keluarclan)$/i;

module.exports = handler;