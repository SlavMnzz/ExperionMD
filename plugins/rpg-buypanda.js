let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    // Harga untuk membeli pet panda
    let pandaPrice = 10000000

    // Memeriksa apakah pengguna memiliki cukup uang untuk membeli panda
    if (user.money < pandaPrice) {
        return conn.reply(m.chat, `Maaf, kamu tidak memiliki cukup uang untuk membeli Panda. Harga Panda adalah ${pandaPrice} coins.`, m)
    }

    // Mengurangi uang pengguna sesuai dengan harga Panda
    user.money -= pandaPrice

    // Menambahkan Panda ke data pengguna
    user.panda = 1

    // Memberi balasan bahwa pembelian Panda berhasil
    conn.reply(m.chat, `Selamat! Kamu berhasil membeli Panda dengan harga ${pandaPrice} coins.`, m)

    // Menyimpan perubahan data pengguna ke dalam database
    global.db.save()
}

handler.help = ['belipanda']
handler.tags = ['rpg']
handler.command = /^belipanda$/i

module.exports = handler