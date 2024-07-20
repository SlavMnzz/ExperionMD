

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw '*• Example:* .delowner @users *[tag or reply users]*'
    if (global.owner.includes(who.split('@')[0])) throw '*• Example:* .delowner @users *[tag or reply users]*'
    global.owner.splice([who.split('@')[0], m.name, true])
    const caption = `@${who.split('@')[0]} has been removed as owner!`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner'].map(a => a + ' *[tag users]*')
handler.tags = ['owner']
handler.command = /^(del|delete|\+)owner$/i
handler.owner = true

module.exports = handler