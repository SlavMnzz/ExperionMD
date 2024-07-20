let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `• *Example:* ${usedPrefix + command} *[jumlah]*`

    let amount = parseInt(text)
    if (isNaN(amount) || amount <= 0) throw '*[ ! ] Only Positive Number*'

    const pricePerLimit = 2000
    const totalPrice = pricePerLimit * amount
    const user = global.db.data.users[m.sender]

    if (user.money >= totalPrice) {
        user.money -= totalPrice
        user.limit = (user.limit || 0) + amount
        conn.reply(m.chat, 
            `*Kamu Telah Berhasil Membeli Limit*\n` +
            `-Informasi\n` +
            `🛡️ Limit: 1\n` +
            `🛒 Harga: 2.000\n\n` +
            `-Detail Pembelian\n` +
            `🧾 ${amount} Sukses Dibeli Dengan Harga ${totalPrice}\n` +
            `=======================================\n` +
            `> TERIMAKASIH TELAH MEMBELI DI UDIN SHOP\n` +
            `=======================================`, m)
    } else {
        conn.reply(m.chat, `*Uang Kamu Tidak Cukup Untuk Membeli Limit Dengan Harga ${totalPrice}, Pembelian Otomatis Dibatalkan*`, m)
    }
}

handler.help = ['limitbuy <jumlah>']
handler.tags = ['rpg']
handler.command = /^limitbuy$/i
handler.rowner = false

module.exports = handler