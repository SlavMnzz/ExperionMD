let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender]

    // Inisialisasi data pet untuk pengguna jika belum ada
    if (!user) {
        global.db.data.users[m.sender] = {
            hydra: 0, hydraexp: 0, hydrahp: 100, hydrahunger: 100, hydrapower: 500,
            anubis: 0, anubisexp: 0, anubishp: 120, anubishunger: 100, anubispower: 800,
            slime: 0, slimeexp: 0, slimehp: 250, slimehunger: 100, slimepower: 1300,
            goblin: 0, goblinexp: 0, goblinhp: 340, goblinhunger: 100, goblinpower: 3600,
            orc: 0, orcexp: 0, orchp: 400, orchunger: 100, orcpower: 5000,
        }
        user = global.db.data.users[m.sender]
    }

    const petNormalPrice = 10000000
    const petPowerDetails = {
        hydra: { price: 1000000000, hp: 500, hunger: 100, power: 10000 },
        anubis: { price: 1500000000, hp: 120, hunger: 100, power: 800 },
        slime: { price: 2000000000, hp: 250, hunger: 100, power: 1300 },
        goblin: { price: 2500000000, hp: 340, hunger: 100, power: 3600 },
        orc: { price: 3000000000, hp: 400, hunger: 100, power: 5000 }
    }

    let petNormal = [
        { name: 'Kucing', price: petNormalPrice },
        { name: 'Kuda', price: petNormalPrice },
        { name: 'Rubah', price: petNormalPrice },
        { name: 'Serigala', price: petNormalPrice },
        { name: 'Naga', price: petNormalPrice },
        { name: 'Phonix', price: petNormalPrice },
        { name: 'Anjing', price: petNormalPrice },
        { name: 'Kyubi', price: petNormalPrice },
        { name: 'Griffin', price: petNormalPrice },
        { name: 'Centaur', price: petNormalPrice },
        { name: 'Panda', price: petNormalPrice }
    ]

    let petListNormal = petNormal.map(pet => `• ${pet.name}: Rp ${pet.price}`).join('\n')
    let petListPower = Object.keys(petPowerDetails).map(pet => {
        let details = petPowerDetails[pet]
        return `${pet.charAt(0).toUpperCase() + pet.slice(1)}\n • Harga: Rp ${details.price}\n • Power: ${details.power}\n • Nyawa: ${details.hp}\n • Hunger: ${details.hunger}`
    }).join('\n\n')

    if (args.length === 0) {
        let petshopMessage = `
Selamat Datang Di PetShop

PET NORMAL
${petListNormal}

PET POWER
${petListPower}

Cara Penggunaan
 • .buypet <namapet> <jumlah>
 • .eat <namapet> <jumlah>
`.trim()
        return conn.reply(m.chat, petshopMessage, m, {
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
    }

    let [namapet, jumlah] = args
    jumlah = parseInt(jumlah) || 1

    if (petNormal.map(p => p.name.toLowerCase()).includes(namapet.toLowerCase())) {
        let pet = petNormal.find(p => p.name.toLowerCase() === namapet.toLowerCase())
        if (user.money >= pet.price * jumlah) {
            // Cek apakah pengguna sudah memiliki pet tersebut
            if (user[namapet.toLowerCase()] >= jumlah) {
                conn.reply(m.chat, `Kamu sudah mempunyai ${jumlah} ${namapet}. Tidak perlu membelinya lagi!`, m, {
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
            } else {
                user.money -= pet.price * jumlah
                user[namapet.toLowerCase()] = (user[namapet.toLowerCase()] || 0) + jumlah
                conn.reply(m.chat, `Kamu telah membeli ${jumlah} ${namapet} seharga Rp ${pet.price * jumlah}`, m, {
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
            }
        } else {
            conn.reply(m.chat, 'Uangmu tidak cukup!', m, {
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
        }
    } else if (petPowerDetails[namapet.toLowerCase()]) {
        let pet = petPowerDetails[namapet.toLowerCase()]
        if (user.money >= pet.price * jumlah) {
            // Cek apakah pengguna sudah memiliki pet tersebut
            if (user[namapet.toLowerCase()] >= jumlah) {
               conn.reply(m.chat, `Kamu sudah mempunyai ${jumlah} ${namapet}. Tidak perlu membelinya lagi!`, m, {
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
            } else {
                user.money -= pet.price * jumlah
                user[namapet.toLowerCase()] = (user[namapet.toLowerCase()] || 0) + jumlah
                conn.reply(m.chat, `Kamu telah membeli ${jumlah} ${namapet} seharga Rp ${pet.price * jumlah}`, m, {
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
            }
        } else {
            conn.reply(m.chat, 'Uangmu tidak cukup!', m, {
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
        }
    } else {
        conn.reply(m.chat, 'Pet tidak ditemukan!', m, {
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
    }
}

handler.help = ['buypet']
handler.tags = ['rpg']
handler.command = /^buypet$/i

module.exports = handler