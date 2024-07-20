const xpperlimit = 1
const baseExp = 5000  // XP dasar yang dibutuhkan untuk level 1
let levelling = require('../lib/levelling')

let handler = async (m, { conn, command, args }) => {
    let user = global.db.data.users[m.sender]
    let count = command.replace(/^nabung/i, '')
    count = count ? /all/i.test(count) ? Math.floor(user.money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
    count = Math.max(1, count)

    if (user.atm == 0) return m.reply('Kamu belum mempunyai ATM!')

    if (user.money >= xpperlimit * count) {
        user.money -= xpperlimit * count
        user.bank += count
        
        // Memformat pesan yang akan dikirim
        let bankMessage = `*WALLET BANK G-RI*
🏧 Bank: G-RI
💵 Nabung: ${count} Money
👤 Nama: ${user.name || m.sender.split('@')[0]}
🆔 Id: ${m.sender.split('@')[0]}
🪙 Status: Berhasil Menabung`;

        // Mengirim pesan balasan
        conn.reply(m.chat, bankMessage, m, {
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
        
        // Mengecek dan menaikkan level jika memungkinkan
        let requiredExp = baseExp * user.level  // XP yang dibutuhkan untuk naik level
        if (user.exp >= requiredExp) {
            user.level += 1
            user.exp = 0

            // Berikan hadiah berdasarkan level
            let hadiahUang = 10000000 * user.level
            user.money += hadiahUang

            // Berikan crate secara acak
            let hadiahCrate = Math.floor(Math.random() * 3) + 1  // crate acak antara 1 sampai 3
            user.common += hadiahCrate

            // Berikan pet secara acak
            const pets = ['kucing', 'kuda', 'naga', 'kyubi', 'centaur', 'rubah', 'phonix', 'griffin', 'serigala']
            let randomPet = pets[Math.floor(Math.random() * pets.length)]
            user[randomPet] = (user[randomPet] || 0) + 1  // tingkatkan level pet atau mulai dari level 1
            
            // Logika tambahan untuk hadiah box berdasarkan level
            if (user.level % 5 === 0) {
                user.boxs += 1
            }
            if (user.level % 10 === 0) {
                user.gardenboxs += 1
            }

            // Kirim pesan level up dan hadiah
            conn.reply(m.chat, `*Selamat @${m.sender.split('@')[0]}!* Kamu telah naik ke level ${user.level}. Bot mereset exp kamu menjadi 0 untuk naik level.

Hadiah yang didapat:
- Crate acak: ${hadiahCrate}
- Uang: ${hadiahUang}
- Pet: ${randomPet.charAt(0).toUpperCase() + randomPet.slice(1)} (Level ${user[randomPet]})
- Boxs: ${user.boxs}
- Gardenboxs: ${user.gardenboxs}`,
            m, { mentions: [m.sender] })
        }
    } else {
        conn.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menabung ${count} money 💹`, m, {
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
};
handler.help = ['nabung'].map(v => v + ' <jumlah>')
handler.tags = ['rpg']
handler.command = /^nabung([0-9]+)|nabung|nabungall$/i

module.exports = handler;