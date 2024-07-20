let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender]
    if (!isOwner) return m.reply('Perintah ini hanya bisa digunakan oleh owner!')

    let [target, health] = text.split(' ')
    health = parseInt(health)
    if (!target || isNaN(health)) return m.reply('Format salah! Gunakan: .addhealth @taguser jumlah')

    let targetUser = global.db.data.users[conn.decodeJid(target)]
    if (!targetUser) return m.reply('Pengguna tidak ditemukan!')

    targetUser.health += health
    conn.reply(m.chat, `Sukses menambahkan ${health} Health kepada ${target}`, m)
}

handler.help = ['addhealth'].map(v => v + ' <@taguser> <jumlah>')
handler.tags = ['owner']
handler.command = /^addhealth$/i
handler.owner = true

module.exports = handler