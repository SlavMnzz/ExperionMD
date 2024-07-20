let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender]
    if (!isOwner) return m.reply('Perintah ini hanya bisa digunakan oleh owner!')

    let [target, amount] = text.split(' ')
    amount = parseInt(amount)
    if (!target || isNaN(amount)) return m.reply('Format salah! Gunakan: .addmoney @taguser jumlah')

    let targetUser = global.db.data.users[conn.decodeJid(target)]
    if (!targetUser) return m.reply('Pengguna tidak ditemukan!')

    targetUser.money += amount
    conn.reply(m.chat, `Sukses menambahkan ${amount} Money kepada ${target}`, m)
}

handler.help = ['addmoney'].map(v => v + ' <@taguser> <jumlah>')
handler.tags = ['owner']
handler.command = /^addmoney$/i
handler.owner = true

module.exports = handler