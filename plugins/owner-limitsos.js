let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
    if (!isOwner) throw 'Perintah ini hanya bisa digunakan oleh owner!'
    if (!text) throw `Contoh: ${usedPrefix + command} @user jumlah`

    let [target, amount] = text.split(' ')
    amount = parseInt(amount)
    if (!target || isNaN(amount) || amount <= 0) throw '*Contoh: .ownlimit @user jumlah*'

    // Get the user ID from the mention
    let targetUserId = target.replace(/[@]/g, '').replace(/[<>]/g, '') + '@s.whatsapp.net'
    const pricePerLimit = 1000
    const totalPrice = pricePerLimit * amount
    const targetUser = global.db.data.users[targetUserId]

    if (!targetUser) throw 'Pengguna tidak ditemukan!'
    if (targetUser.money < totalPrice) throw `*Uang @${targetUserId.split('@')[0]} tidak cukup untuk membeli limit sebesar ${totalPrice}!*`

    targetUser.money -= totalPrice
    targetUser.limit = (targetUser.limit || 0) + amount

    conn.reply(m.chat, 
        `*Selamat Limit @${target.split('@')[0]} Telah Ditambahkan*\n` +
        `-Informasi\n` +
        `🛡️ Limit: ${amount}\n` +
        `🛒 Harga: ${totalPrice}\n\n` +
        `> TERIMAKASIH TELAH MEMBELI DI UDIN SHOP\n` +
        `=======================================`, m)
}

handler.help = ['ownlimit <@user jumlah>']
handler.tags = ['owner']
handler.command = /^ownlimit$/i
handler.rowner = true

module.exports = handler