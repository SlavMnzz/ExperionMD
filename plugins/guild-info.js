let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let target = m.mentionedJid[0] || m.sender;

    if (!global.db.data.users[target].guild) return conn.reply(m.chat, 'Pengguna ini tidak tergabung dalam guild.', m);

    let guildName = global.db.data.users[target].guild;
    let guild = global.db.data.guilds[guildName];

    let membersList = guild.members.map((member, idx) => `• ${idx + 1}. @${member.split('@')[0]}`).join('\n');
    let guildInfo = `
Nama Guild: ${guild.name}
Pemilik: @${guild.owner.split('@')[0]}
Anggota:
${membersList}
Dibuat Pada: ${guild.created_at}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [guild.owner, ...guild.members] });
};

handler.help = ['guildinfo [@user]'];
handler.tags = ['guild'];
handler.command = /^(guildinfo)$/i;
module.exports = handler;