let handler = async (m, { conn, args }) => {
    if (args.length < 1) return conn.reply(m.chat, 'Contoh penggunaan: .createguild <nama_guild>', m);
    
    let guildName = args.join(' ');
    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (user.guild) return conn.reply(m.chat, 'Kamu sudah tergabung dalam guild.', m);
    
    let guildId = 'guild_' + new Date().getTime(); // Membuat ID guild unik
    if (!global.db.data.guilds[guildId]) {
        global.db.data.guilds[guildId] = {
            name: guildName,
            owner: userId,
            members: [userId],
            createdAt: new Date().toISOString()
        };
        user.guild = guildId;
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
        conn.reply(m.chat, `Guild ${guildName} berhasil dibuat.`, m);
    } else {
        conn.reply(m.chat, 'Terjadi kesalahan saat membuat guild. Coba lagi.', m);
    }
};

handler.help = ['createguild <nama_guild>'];
handler.tags = ['guild'];
handler.command = /^(createguild)$/i;
handler.owner = false;

module.exports = handler;