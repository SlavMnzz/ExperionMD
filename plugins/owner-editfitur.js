const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
    if (!isOwner) throw 'Perintah ini hanya bisa digunakan oleh owner!'
    if (!text) throw `Format salah! Contoh: ${usedPrefix + command} namafile.js|kode`

    let [filename, ...codeArray] = text.split('|')
    let code = codeArray.join('|').trim()

    if (!filename || !code) throw `Format salah! Contoh: ${usedPrefix + command} namafile.js|kode`

    if (!/\.js$/i.test(filename)) filename += '.js'
    const filepath = path.join(__dirname, filename)

    if (!fs.existsSync(filepath)) throw `File ${filename} tidak ditemukan!`

    try {
        fs.writeFileSync(filepath, code)
        conn.reply(m.chat, `*Isi Kode Berhasil Diganti*\n${filename}`, m)
    } catch (error) {
        conn.reply(m.chat, `*Kode Gagal Diganti*\nError: ${error.message}`, m)
    }
}

handler.help = ['editfitur <namafile|kode>']
handler.tags = ['owner']
handler.command = /^editfitur$/i
handler.rowner = true

module.exports = handler