let handler = async (m, { conn, command, args }) => {
    if (!args[0]) return conn.reply(m.chat, '*Contoh: .intro gerry.jakarta.17*', m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/d55855ccf2c4fa4892784.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })

    let [name, city, age] = args.join(' ').split('.');
    if (!name || !city || !age || isNaN(age)) return conn.reply(m.chat, '*Contoh: .intro gerry.jakarta.17*', m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/d55855ccf2c4fa4892784.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

    let groupLink = getGroupLink(m.text);
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
    let groupName = groupMetadata ? groupMetadata.subject : 'Private Chat';

    let userNumber = m.sender.split('@')[0];
    let currentDate = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    let introMessage = `👤 NAMA: ${name}
🏡 ASAL: ${city}
🕵️ UMUR: ${age}
📑 GROUP: ${groupLink ? 'ambil link groupnya' : groupName}
📞 NOMOR: ${userNumber}
🕑 DATE: ${currentDate}`;

    conn.reply(m.chat, introMessage, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/d55855ccf2c4fa4892784.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
};

// Function to extract group link using regex
function getGroupLink(text) {
    let regex = /(https?:\/\/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24}))(?:\?|$)/i;
    let match = text.match(regex);
    return match ? match[1] : null;
}

handler.help = ['intro'];
handler.tags = ['main'];
handler.command = /^intro$/i;

module.exports = handler;