let handler = async (m, { conn, args, text }) => {
    if (!m.mentionedJid) {
        return conn.reply(m.chat, `Format salah. Contoh: .duelpet goblin @tagetuser`, m)
    }

    let user = global.db.data.users[m.sender]
    let petName = args[0]?.toLowerCase()
    let target = args[1].replace(/[^0-9]/g, '')

    // Daftar pet power dengan spesifikasi yang sesuai
    let petPowerDetails = {
        hydra: { name: 'Hydra', power: 10000, health: 500 },
        anubis: { name: 'Anubis', power: 800, health: 120 },
        slime: { name: 'Slime', power: 1300, health: 250 },
        goblin: { name: 'Goblin', power: 3600, health: 340 },
        orc: { name: 'Orc', power: 5000, health: 400 }
    }

    // Cek apakah pet yang dipilih oleh pengguna ada dalam daftar pet power
    if (!petPowerDetails[petName]) {
        return conn.reply(m.chat, `Pet tidak ditemukan.`, m)
    }

    // Cek apakah target memiliki pet yang sama dengan pet yang dipilih oleh pengguna
    let targetUser = global.db.data.users[target]
    let targetPet = petPowerDetails[petName]

    if (!targetUser || !targetUser[petName]) {
        return conn.reply(m.chat, `Target tidak memiliki pet ${petName}.`, m)
    }

    let targetPetLevel = targetUser[petName]
    let targetPetPower = targetPet.power
    let targetPetHealth = targetPet.health

    let userPetLevel = user[petName]
    let userPetPower = petPowerDetails[petName].power
    let userPetHealth = petPowerDetails[petName].health

    // Tentukan hasil duel berdasarkan perbandingan kekuatan pet
    let resultMessage = ''
    let moneyReward = 0
    let expReward = 0

    if (Math.abs(userPetPower - targetPetPower) <= 1000) {
        // Seri
        moneyReward = 0
        expReward = 0
        resultMessage = `DUEL PET DIMULAI

PET @${m.sender.split('@')[0]}
  - Level: ${userPetLevel}
  - Power: ${userPetPower}
  - Health: ${userPetHealth}

VERSUS

PET @${targetUser.jid.split('@')[0]}
  - Level: ${targetPetLevel}
  - Power: ${targetPetPower}
  - Health: ${targetPetHealth}

PERTANDINGAN SERI! Pertandingan ulang akan dilakukan dengan aturan lebih ketat.
`
    } else if (userPetPower > targetPetPower) {
        // Pengguna menang
        moneyReward = 5000000
        expReward = 80
        targetPetHealth -= Math.floor(Math.random() * (50 - 10 + 1)) + 10
        resultMessage = `DUEL PET DIMULAI

PET @${m.sender.split('@')[0]}
  - Level: ${userPetLevel}
  - Power: ${userPetPower}
  - Health: ${userPetHealth}

VERSUS

PET @${targetUser.jid.split('@')[0]}
  - Level: ${targetPetLevel}
  - Power: ${targetPetPower}
  - Health: ${targetPetHealth}

PET WIN
 - MONEY: ${moneyReward}
 - EXP: ${expReward}

PET LOSE
 - MONEY: -${moneyReward}
 - EXP: -40

*@${m.sender.split('@')[0]} Telah Menang Dalam Pertandingan Melawan @${targetUser.jid.split('@')[0]}*

REWARD PET KAMU
- List hadiah untuk pet kamu`
    } else {
        // Pengguna kalah
        moneyReward = -5000000
        expReward = -40
        userPetHealth -= Math.floor(Math.random() * (99 - 50 + 1)) + 50
        resultMessage = `DUEL PET DIMULAI

PET @${m.sender.split('@')[0]}
  - Level: ${userPetLevel}
  - Power: ${userPetPower}
  - Health: ${userPetHealth}

VERSUS

PET @${targetUser.jid.split('@')[0]}
  - Level: ${targetPetLevel}
  - Power: ${targetPetPower}
  - Health: ${targetPetHealth}

PET LOSE
 - MONEY: -${moneyReward}
 - EXP: -40

PET WIN
 - MONEY: ${moneyReward}
 - EXP: ${expReward}`
    }

    // Simpan hasil perubahan ke database
    global.db.data.users[target].makananpet -= 2

    // Simpan hasil duel ke dalam database
    const dbPath = path.join(__dirname, '..', 'database.json')
    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2))

    // Tunggu 5 menit untuk melihat hasil pertandingan
    setTimeout(() => {
        conn.reply(m.chat, resultMessage, m)
    }, 300000) // 5 menit dalam milidetik

    conn.reply(m.chat, `Pertandingan sedang berlangsung, tunggu hasilnya dalam 5 menit.`, m)
}

handler.help = ['duelpet']
handler.tags = ['rpg']
handler.command = /^duelpet$/i

module.exports = handler