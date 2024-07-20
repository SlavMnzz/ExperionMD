let handler = async (m, { conn, text }) => {
    let data = readDataClan();
    let user = global.db.data.users[m.sender];
    if (!user.clan) return conn.reply(m.chat, 'Kamu belum bergabung dengan clan.', m);

    let clan = data.clans[user.clan];
    if (clan.leader !== m.sender) return conn.reply(m.chat, 'Hanya pemimpin clan yang dapat menambahkan staff.', m);

    let mentionedUser = m.mentionedJid[0];
    if (!mentionedUser) return conn.reply(m.chat, 'Tag anggota yang ingin dijadikan staff.', m);

    if (!clan.members.includes(mentionedUser)) return conn.reply(m.chat, 'Pengguna bukan anggota clan.', m);

    if (clan.staff && clan.staff.includes(mentionedUser)) return conn.reply(m.chat, 'Pengguna sudah menjadi staff.', m);

    if (!clan.staff) clan.staff = [];
    clan.staff.push(mentionedUser);

    writeDataClan(data);

    conn.reply(m.chat, `@${mentionedUser.split('@')[0]} telah ditambahkan sebagai staff clan "${clan.name}".`, m, {
        mentions: [mentionedUser]
    });
}

handler.help = ['addstaff @user'];
handler.tags = ['rpg'];
handler.command = /^(addstaff|tambahkanstaff)$/i;

module.exports = handler;