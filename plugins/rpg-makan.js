let handler = async (m, { conn, args }) => {
    // Mendapatkan data pengguna dari database global
    let user = global.db.data.users[m.sender]

    // Mendapatkan nama buah dan jumlah yang ingin dimakan dari argumen yang diberikan
    let namaBuah = args[0].toLowerCase()
    let jumlahBuah = parseInt(args[1])

    // Menentukan jumlah darah yang ditambahkan per buah
    const darahPerBuah = 5

    // Memeriksa apakah jumlah buah yang diminta valid dan pengguna memiliki cukup buah
    if (isNaN(jumlahBuah) || jumlahBuah <= 0) {
        conn.reply(m.chat, `Masukkan jumlah buah yang valid.`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }); 
        return
    };
    if (!user.inventory[namaBuah] || user.inventory[namaBuah] < jumlahBuah) {
        conn.reply(m.chat, `Maaf, Anda tidak memiliki cukup ${namaBuah} dalam inventaris Anda.`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
        return
    };
    // Menghitung total darah yang ditambahkan
    let tambahanDarah = darahPerBuah * jumlahBuah

    // Menambahkan darah ke kesehatan pengguna
    user.health += tambahanDarah

    // Mengurangi jumlah buah yang dimiliki pengguna dalam inventaris
    user.inventory[namaBuah] -= jumlahBuah

    // Mengupdate data pengguna di database global
    global.db.data.users[m.sender] = user

    // Menampilkan pesan kepada pengguna tentang efek dari makan buah
    conn.reply(m.chat, `Anda memakan ${jumlahBuah} ${namaBuah} dan mendapatkan tambahan ${tambahanDarah} HP.`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

    // Log aktivitas pengguna
    console.log(`${m.sender} memakan ${jumlahBuah} ${namaBuah} dan mendapatkan tambahan ${tambahanDarah} HP.`)
}

// Register command
handler.command = ['makan']
handler.tags = ['rpg']
handler.help = ['makan <nama buah> <jumlah>']
handler.group = true
handler.register = true
module.exports = handler