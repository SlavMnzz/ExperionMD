let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    // Semua nama pet normal dan data pet power
    let allPetsNormal = ['kucing', 'rubah', 'serigala', 'naga', 'kuda', 'phonix', 'griffin', 'kyubi', 'centaur', 'panda']
    let petPowerDetails = {
        hydra: { level: user.hydra || 0, exp: user.hydraexp || 0, hp: 500, hunger: user.hydrahunger || 100, power: 10000 },
        anubis: { level: user.anubis || 0, exp: user.anubisexp || 0, hp: 120, hunger: user.anubishunger || 100, power: 800 },
        slime: { level: user.slime || 0, exp: user.slimeexp || 0, hp: 250, hunger: user.slimehunger || 100, power: 1300 },
        goblin: { level: user.goblin || 0, exp: user.goblinexp || 0, hp: 340, hunger: user.goblinhunger || 100, power: 3600 },
        orc: { level: user.orc || 0, exp: user.orcexp || 0, hp: 400, hunger: user.orchunger || 100, power: 5000 }
    }

    // Filter pet normal yang dimiliki pengguna
    let userPetsNormal = allPetsNormal.filter(pet => user[pet])
    let petInfoNormal = userPetsNormal.map(pet => ({
        name: capitalize(pet),
        level: user[pet],
        exp: user[`anak${pet}`] || 0,
    }))

    // Filter pet power yang dimiliki pengguna
    let petInfoPower = Object.keys(petPowerDetails).map(pet => {
        let details = petPowerDetails[pet]
        return {
            name: capitalize(pet),
            level: details.level,
            exp: details.exp,
            hp: details.hp,
            hunger: details.hunger,
            power: details.power
        }
    }).filter(pet => pet.level > 0)

    // Format respons
    let response = `

▬▭▬▭▬▭▬▭▬▭▬▭▬
          𝗜𝗡𝗙𝗢 𝗣𝗘𝗧 𝗕𝗔𝗦𝗜𝗖
 ${petInfoNormal.map(pet => `
🐾 Pet: ${pet.name}
🆙 Level: ${pet.level}
⏫ Exp: ${pet.exp}/${pet.level * 3000}

`).join('')}

▬▭▬▭▬▭▬▭▬▭▬▭▬
         𝗜𝗡𝗙𝗢 𝗣𝗘𝗧 𝗣𝗢𝗪𝗘𝗥
${petInfoPower.map(pet => `

🐾 Pet: ${pet.name}
🆙 Level: ${pet.level}
⏫ Exp: ${pet.exp}/${pet.level * 3000}
💪 Power: ${pet.power}
❤️ Nyawa: ${pet.hp}
🍢 Hunger: ${pet.hunger}
`).join('')}
    `.trim()

    conn.reply(m.chat, response, m)
}

handler.help = ['petinfo']
handler.tags = ['rpg']
handler.command = /^petinfo$/i

module.exports = handler

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}