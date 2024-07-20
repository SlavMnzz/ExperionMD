***
 CREATOR RIZXYU(SXZY)
 github.com/Rizxyu
 Dont delete credit nigga
***/
let handler = async (m, { conn, usedPrefix, text, command}) => {

var user = global.db.data.users[m.sender]

global.skill = ["swordmaster", "necromancer", "witch", "Archer", "magicswordmaster", "thief", "shadow"]

var bintang = {
"satu": "⭐",
"dua": "⭐⭐",
"tiga": "⭐⭐⭐",
"empat": "⭐⭐⭐⭐",
"lima": "⭐⭐⭐⭐⭐",
"Enam": "⭐⭐⭐⭐⭐⭐"
}//star how good is the skill
   
   let skil = text.trim().toLowerCase() // to filter text
     
   if (!skill.includes(skil)) throw `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:\n\n${skill.map(skil => `› ${skil}`).join('\n')}

     How To use/Cara menggunakan:
     ${usedPrefix + command} <nameskill>
     
     Example/Contoh:
     ${usedPrefix + command} necromancer
     `

    if (user.skill == "") {
    user.skill = skil
    conn.reply(m.chat, `Anda telah memilih Skill ${skil}`, m, {
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
    } else if (user.skill) {
    conn.reply(m.chat, `Anda Sudah Punya skill ${user.skill} Tidak bisa diganti`, m, {
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

handler.help = ['selectskill <type>']
handler.tags = ['rpg']
handler.command = /^(slectskill|selectskill)$/i

module.exports = handler