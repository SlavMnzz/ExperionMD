let levelling = require('../lib/levelling')
const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender]
    let petName = args[0]?.toLowerCase()
    let foodAmount = parseInt(args[1])

    if (!petName || !foodAmount || isNaN(foodAmount)) {
        return conn.reply(m.chat, `Format salah. Contoh: .eat kucing 5`, m, {
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
  })
    }

    let pets = {
        kucing: { level: user.kucing || 1, exp: user.anakkucing || 0, name: 'Kucing', lastFed: user.lastFedKucing || 0 },
        rubah: { level: user.rubah || 1, exp: user.anakrubah || 0, name: 'Rubah', lastFed: user.lastFedRubah || 0 },
        serigala: { level: user.serigala || 1, exp: user.anakserigala || 0, name: 'Serigala', lastFed: user.lastFedSerigala || 0 },
        naga: { level: user.naga || 1, exp: user.anaknaga || 0, name: 'Naga', lastFed: user.lastFedNaga || 0 },
        kuda: { level: user.kuda || 1, exp: user.anakkuda || 0, name: 'Kuda', lastFed: user.lastFedKuda || 0 },
        phonix: { level: user.phonix || 1, exp: user.anakphonix || 0, name: 'Phonix', lastFed: user.lastFedPhonix || 0 },
        griffin: { level: user.griffin || 1, exp: user.anakgriffin || 0, name: 'Griffin', lastFed: user.lastFedGriffin || 0 },
        kyubi: { level: user.kyubi || 1, exp: user.anakkyubi || 0, name: 'Kyubi', lastFed: user.lastFedKyubi || 0 },
        centaur: { level: user.centaur || 1, exp: user.anakcentaur || 0, name: 'Centaur', lastFed: user.lastFedCentaur || 0 },
        panda: { level: user.panda || 1, exp: user.anakpanda || 0, name: 'Panda', lastFed: user.lastFedPanda || 0 },
        // Tambahkan pet power dengan properti yang sesuai
        hydra: { level: user.hydra || 1, exp: user.hydraexp || 0, power: 10000, name: 'Hydra', lastFed: user.lastFedHydra || 0 },
        anubis: { level: user.anubis || 1, exp: user.anubisexp || 0, power: 800, name: 'Anubis', lastFed: user.lastFedAnubis || 0 },
        slime: { level: user.slime || 1, exp: user.slimeexp || 0, power: 1300, name: 'Slime', lastFed: user.lastFedSlime || 0 },
        goblin: { level: user.goblin || 1, exp: user.goblinexp || 0, power: 3600, name: 'Goblin', lastFed: user.lastFedGoblin || 0 },
        orc: { level: user.orc || 1, exp: user.orcexp || 0, power: 5000, name: 'Orc', lastFed: user.lastFedOrc || 0 }
    }

    if (!pets[petName]) {
        return conn.reply(m.chat, `Pet tidak ditemukan. List pet: ${Object.keys(pets).join(', ')}`, m, {
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

    let pet = pets[petName]
    let expGain = foodAmount * 30

    // Periksa apakah pengguna memiliki cukup makananpet
    if (user.makananpet < foodAmount) {
        return conn.reply(m.chat, `Kamu tidak memiliki cukup makananpet.`, m, {
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

    // Cek apakah sudah membatasi makan untuk pet tersebut hari ini
    let lastFed = pet.lastFed || 0
    let hoursSinceLastFed = (Date.now() - lastFed) / (1000 * 60 * 60) // Hitung selisih waktu dalam jam
    if (hoursSinceLastFed < 20) { // Jika belum 20 jam
        return conn.reply(m.chat, `${foodAmount} Telah Dimakan Dan Pet ${pet.name} Telah Kenyang Hari Ini, Tunggu Besok Ketika Dia Lapar.`, m, {
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

    // Batasi jumlah makananpet yang diberikan per hari
    if (foodAmount > 500) {
        return conn.reply(m.chat, `Maksimal 500 makananpet per hari!`, m, {
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

    // Kurangi makananpet dari inventaris pengguna
    user.makananpet -= foodAmount

    // Tambahkan exp yang didapat dari memberi makan pet
    pet.exp += expGain

    let levelUpMessage = ''

    if (pet.exp >= pet.level * 3000) {
        let levelUps = Math.floor(pet.exp / (pet.level * 3000))
        pet.exp %= pet.level * 3000
        pet.level += levelUps
        pet.power += 200 // Tambahkan 200 ke power pet saat naik level
        let expNextLevel = pet.level * 3000
        // Berikan hadiah acak
        user.diamond += Math.floor(Math.random() * 10) + 1
        levelUpMessage += `
*SELAMAT PET @${m.sender.split('@')[0]} TELAH NAIK LEVEL*

𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗦𝗜 𝗞𝗘𝗡𝗔𝗜𝗞𝗔𝗡
 🐾 ${pet.name}
 ⏫ Level Up: ${pet.level}
 🦹‍♂️ Power: ${pet.power}
 🥡 Kebutuhan ${expNextLevel} exp untuk level berikutnya
`.trim()
    }

    if (levelUpMessage) conn.reply(m.chat, levelUpMessage, m, {
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
  })

    // Simpan perubahan ke database.json di folder utama
    const dbPath = path.join(__dirname, '..', 'database.json')
    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2))

    // Update data pet pada user
    user[petName] = pet.level
    user[`anak${petName}`] = pet.exp
    user[`${petName}power`] = pet.power // Menyimpan power pet dalam database
    user[`lastFed${petName.charAt(0).toUpperCase() + petName.slice(1)}`] = pet.lastFed // Menyimpan waktu terakhir makan pet

    conn.reply(m.chat, `${pet.name} sekarang memiliki ${pet.exp}/${pet.level * 3000} exp`, m, {
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

handler.help = ['eat']
handler.tags = ['rpg']
handler.command = /^eat$/i

module.exports = handler