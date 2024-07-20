const { MessageType } = require('@adiwajshing/baileys')

let lastPesanIndex = -1 // Indeks pesan terakhir yang dikirim
let lastPesanTime = 0 // Waktu terakhir pesan dikirim

// Waktu antara pesan minimal 15 menit dan maksimal 1 hari (dalam milidetik)
const minInterval = 15 * 60 * 1000 // 15 menit
const maxInterval = 24 * 60 * 60 * 1000 // 1 hari

// Daftar pesan yang akan dikirim secara acak beserta foto masing-masing pesan
const pesanList = [
    {
        text: "Tidak!, Monster Silverwood Telah Datang. Siapkan Armor Kamu Untuk Bertahan Dari Monster Itu😱",
        image: "https://telegra.ph/file/09d559484f85766ddf785.jpg"
    },
    {
        text: "Banyak Item Berserakan Di Hutan Whispering, Ayo Kumpulkan Item Berharga Dengan .mulung",
        image: "https://telegra.ph/file/dfe39c4abbf7557b8f1a2.jpg"
    },
    {
        text: "Simpan Uang Kamu Agar Tidak Dicuri Oleh Orang Lain!",
        image: "https://telegra.ph/file/c93bbaa5115ee75890460.jpg"
    },
    {
        text: "Buka Crate Kamu Untuk Mendapat Hadiah Menarik",
        image: "https://telegra.ph/file/6c78cba1bfad40f92128d.jpg"
    },
    {
        text: "Kamu Bisa Mendapatkan Lebih Banyak Uang Dengan Merampok Secara Diam Diam",
        image: "https://telegra.ph/file/6c78cba1bfad40f92128d.jpg"
    },
    {
        text: "Dua Kerajaan Ditemukan Hancur, Ayo Ambil Beberapa Item Berharga Dan Jual Untuk Mendapat Banyak Uang",
        image: "https://telegra.ph/file/baa02dca55f819ed581d4.jpg"
    },
    {
        text: "Sepertinya Pertambangan Telah Di Gali Lebih Dalam, Kamu Bisa Menambang Untuk Mendapat Ore Langka",
        image: "https://telegra.ph/file/69e700495794312d88b24.jpg"
    },
    {
        text: "Bunuh Seseorang Dan Bawa Sword Kamu Untuk Menjadi Kuat Dan Mendapat Lebih Banyak Barang Curian",
        image: "https://telegra.ph/file/565aa52cff9bc097d3703.jpg"
    },
    {
        text: "@user Telah Dibunuh Oleh Monster Moonlight, Beberapa Item Kamu Telah Di Ambil😱",
        image: "https://telegra.ph/file/2a1e40cca1edbb585e468.jpg"
    },
    {
        text: "Beberapa Pulau Ditemukan!, Ayo Berkunjung Sekarang",
        image: "https://telegra.ph/file/0722466ec0ae0fa51a98a.jpg"
    }
]

let handler = async (m, { conn }) => {
    let pesanIndex = -1 // Indeks pesan yang akan dikirim
    let now = new Date() // Waktu sekarang
    
    // Menentukan waktu jeda antara pesan secara acak
    let jedaWaktu = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval
    
    // Memilih pesan secara acak (tidak boleh sama dengan pesan sebelumnya)
    do {
        pesanIndex = Math.floor(Math.random() * pesanList.length)
    } while (pesanIndex === lastPesanIndex)

    // Mengirim pesan dengan foto
    let pesan = pesanList[pesanIndex]
    let options = { quoted: m }
    let userMessages = await conn.loadMessages(m.chat, 5)
    if (userMessages.length > 0) {
        let randomIndex = Math.floor(Math.random() * userMessages.length);
        let randomMessage = userMessages[randomIndex];
        options.contextInfo = { mentionedJid: [randomMessage.key.remoteJid]}
    }
    conn.sendMessage(m.chat, pesan.text, MessageType.text, options)
    conn.sendFile(m.chat, pesan.image, '', '', m)

    // Menyimpan indeks dan waktu pesan terakhir
    lastPesanIndex = pesanIndex
    lastPesanTime = now.getTime() + jedaWaktu
}

// Fungsi untuk mengirim pesan otomatis setiap 1 menit
function jedaWaktuAcak() {
    setInterval(() => {
        let now = new Date().getTime()
        
        // Memastikan waktu interval sudah mencapai minimum 15 menit dan pesan terakhir sudah dikirim
        if (now - lastPesanTime >= minInterval && lastPesanIndex !== -1) {
            handler({ chat: 'group' }, { conn: global.conn })
        }
    }, 60000) // Check setiap 1 menit
}

// Memulai proses pengiriman pesan otomatis pertama kali
handler({ chat: 'group' }, { conn: global.conn })
jedaWaktuAcak()

module.exports = handler