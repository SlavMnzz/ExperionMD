const fs = require('fs')

const path = require('path')

let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {

    if (!isOwner) throw 'Perintah ini hanya bisa digunakan oleh owner!'

    if (!text) throw `Contoh: ${usedPrefix + command} namafile.js|kode`

    let [filename, ...codeArray] = text.split('|')

    let code = codeArray.join('|').trim()

    if (!filename || !code) throw `Format salah! Contoh: ${usedPrefix + command} namafile.js|kode`

    if (!/\.js$/i.test(filename)) filename += '.js'

    const filepath = path.join(__dirname, filename)

    try {

        fs.writeFileSync(filepath, code)

        conn.reply(m.chat, `*Fitur Baru Berhasil Ditambahkan*\n${filename}`, m)

    } catch (error) {

        conn.reply(m.chat, `*Gagal Menambahkan Fitur*\nError: ${error.message}`, m)

    }

}

handler.help = ['addfitur <namafile|kode>']

handler.tags = ['owner']

handler.command = /^addfitur$/i

handler.rowner = true

module.exports = handler