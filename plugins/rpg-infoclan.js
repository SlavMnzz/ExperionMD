let handler = async (m, { conn, text }) => {
    let data = readDataClan();
    let clanName = text.trim();
    let clan = Object.values(data.clans).find(c => c.name.toLowerCase() === clanName.toLowerCase());

    if (!clan) return conn.reply(m.chat, 'Clan tidak ditemukan.', m);

    let memberList = clan.members.map(member => `- @${member.split('@')[0]}`).join('\n');

    let info = `Clan: ${clan.name}
Leader: @${clan.leader.split('@')[0]}
Level: ${clan.level}
Points: ${clan.points}
Members:
${memberList}`;

    conn.reply(m.chat, info, m, {
        mentions: clan.members
    });
}

handler.help = ['claninfo <name>'];
handler.tags = ['rpg'];
handler.command = /^(claninfo|infoclan)$/i;

module.exports = handler;