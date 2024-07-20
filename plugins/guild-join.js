let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let guildName = args.join(' ');

    if (!guildName) return conn.reply(m.chat, 'Masukkan nama guild yang valid.', m);
    if (user.guild) return conn.reply(m.chat, 'Anda sudah bergabung dalam guild.', m);

    let guild = global.db.data.guilds[guildName];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    guild.members.push(m.sender);
    user.guild = guildName;

    conn.reply(m.chat, `Anda berhasil bergabung dengan guild ${guildName}.`, m);
};

handler.help = ['joinguild <nama_guild>'];
handler.tags = ['guild'];
handler.command = /^(joinguild)$/i;
module.exports = handler;