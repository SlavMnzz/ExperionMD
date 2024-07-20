const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')
const fetch = require('node-fetch')
const { pickRandom } = ('../lib/functions.js')

let menulist = async (m, { conn, usedPrefix, command, args }) => {
  const perintah = args[0] || 'tags';
  const tagCount = {};
  const tagHelpMapping = {};
  
  Object.keys(global.features)
    .filter(plugin => !plugin.disabled)
    .forEach(plugin => {
      const tagsArray = Array.isArray(global.features[plugin].tags)
        ? global.features[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.features[plugin].help)
          ? global.features[plugin].help
          : [global.features[plugin].help];

        tagsArray.forEach(tag => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.features).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  });

  if (perintah === 'tags') {
    const daftarTag = Object.keys(tagCount)
    .sort()
      .join('\n│⳻⳻ ' + usedPrefix + command + '  ');
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let name = m.pushName || conn.getName(m.sender)
    let list = `ʜɪ sᴀʏᴀ ᴇxᴘᴇʀɪᴏɴ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ,
ᴀᴋᴜ ʙɪsᴀ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ ᴅᴇɴɢᴀɴ ᴋᴇᴍᴀᴍᴘᴜᴀɴ ʏᴀɴɢ sᴀʏᴀ ᴘᴜɴʏᴀ, ᴀᴋᴜ ᴅɪᴄɪᴘᴛᴀᴋᴀɴ ᴏʟᴇʜ ᴅᴄᴏᴅᴇᴍɴᴢᴢ ᴅᴇɴɢᴀɴ ᴛᴜᴊᴜᴀɴ sᴇʙᴀɢᴀɪ ʜɪʙᴜʀᴀɴ.
━━━━━━━━━━━━━━━━━━━━━━━━━━━
◉ *ɴᴀᴍᴀ*: ${namebot}  
◉ *ᴠᴇʀsɪᴏɴ*: ${version} 
◉ *sᴛᴀᴛᴜs*: ${global.opts['self'] ? 'Self' : 'Public'}
◉ *ᴛɪᴍᴇ*: ${await DateNow(new Date)}
◉ *ᴊᴜᴍʟᴀʜ ᴜsᴇʀ*: ${Object.keys(db.data.users).length}  
◉ *ᴍᴇɴᴜ ʟᴇɴɢᴛʜ*: ${Object.keys(tagCount).length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
╭─「 𝗚𝗘𝗥𝗥𝗬 𝗠𝗘𝗡𝗨 」
│⳻⳻ ${usedPrefix + command} all
│⳻⳻ ${usedPrefix + command} ${daftarTag}\n╰─────────────
`
 const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/434a6b9716e0238bb66fc.png");

if (global.menu === 'simple') {
  m.reply(list);
} else if (global.menu === 'doc') {
 conn.sendMessage(m.chat, {
  document: {
    url: sourceurl
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
caption: list,
fileName: await conn.msToDate(process.uptime() * 1000)
,contextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
    businessMessageForwardInfo: {
            businessOwnerJid: bisnis
       }}},{quoted: m});
} else if (global.menu === 'gif') {
  conn.sendMessage(m.chat, { image: { url: gif }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: list,     contextInfo: {
  mentionedJid: [m.sender],
    externalAdReply: {
        title: namebot,
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }}, { quoted: m})
} else if (global.menu === 'payment' ) {
await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 9999999999 * 1000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: list,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
} else if (global.menu === 'edit') {
 const arr = [
 { text: `➳ *L*`, timeout: 200 },
{ text: `➳ *L O*`, timeout: 200 },
{ text: `➳ *L O A*`, timeout: 200 },
{ text: `➳ *L O A D*`, timeout: 200 },
{ text: `➳ *L O A D I*`, timeout: 200 },
{ text: `➳ *L O A D I N*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *W E L C O M E`, timeout: 200 },
{ text: list, timeout: 200 },
  ];
  
let { key } = await conn.sendMessage(m.chat, {
  document: {
    url: "https://wa.me"
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
  caption: `➳ *Please Wait...*`,
  fileName: await conn.msToDate(process.uptime() * 1000),
  contextInfo: {
  mentionedJid: [m.sender],
    isForwarded: true,
    businessMessageForwardInfo: {
      businessOwnerJid: bisnis
    }
  }
}, { quoted: m });
  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
  await conn.sendMessage(m.chat, {
    document: {
      url: "https://wa.me"
    },
    jpegThumbnail: await conn.resize(thumb, 300, 150),
    caption: arr[i].text,
    fileName: await conn.msToDate(process.uptime() * 1000),
    edit: key,
    contextInfo: {
    mentionedJid: [m.sender],
      isForwarded: true,
      businessMessageForwardInfo: {
        businessOwnerJid: bisnis
      }
    }
  }, { quoted: m });
}
} else {
  conn.sendMessage(m.chat, {
    text: list,
    contextInfo: {
    mentionedJid: [m.sender],
externalAdReply: {
        title: namebot,
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
  conn.sendFile(m.chat, './mp3/menu.mp3', '', null, m, true, null);
}
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah].map((helpItem, index) => {
      return `.${helpItem}`;
    }).join('\n│⳻⳻ '  + '');
    const list2 =  `╭─「 *MENU ${perintah.toUpperCase()}* 」\n│⳻⳻ ${daftarHelp}\n╰─────────────`
     const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/434a6b9716e0238bb66fc.png");

if (global.menu === 'simple') {
  m.reply(list2);
} else if (global.menu === 'doc') {
 conn.sendMessage(m.chat, {
  document: {
    url: "https://wa.me"
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
caption: list2,
fileName: await conn.msToDate(process.uptime() * 1000)
,contextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
    businessMessageForwardInfo: {
            businessOwnerJid: bisnis
       }}},{quoted: m});
} else if (global.menu === 'gif') {
  conn.sendMessage(m.chat, { image: { url: gif }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: list2,     contextInfo: {
  mentionedJid: [m.sender],
externalAdReply: {
        title: "𝗚𝗘𝗥𝗥𝗬 𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘",
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
      }
    }, { quoted: m})
} else if (global.menu === 'payment' ) {
await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 9999999999 * 1000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: list2,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
} else if (global.menu === 'edit') {
 const arr = [
 { text: `➳ *L*`, timeout: 200 },
{ text: `➳ *L O*`, timeout: 200 },
{ text: `➳ *L O A*`, timeout: 200 },
{ text: `➳ *L O A D*`, timeout: 200 },
{ text: `➳ *L O A D I*`, timeout: 200 },
{ text: `➳ *L O A D I N*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *W E L C O M E*`, timeout: 200 },
{ text: list2, timeout: 200 },
  ];
  
let { key } = await conn.sendMessage(m.chat, {
  document: {
    url: "https://wa.me"
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
  caption: `➳ *Please Wait...*`,
  fileName: await conn.msToDate(process.uptime() * 1000),
  contextInfo: {
  mentionedJid: [m.sender],
    isForwarded: true,
    businessMessageForwardInfo: {
      businessOwnerJid: bisnis
    }
  }
}, { quoted: m });
  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
  await conn.sendMessage(m.chat, {
    document: {
      url: "https://wa.me"
    },
    jpegThumbnail: await conn.resize(thumb, 300, 150),
    caption: arr[i].text,
    fileName: await conn.msToDate(process.uptime() * 1000),
    edit: key,
    contextInfo: {
    mentionedJid: [m.sender],
      isForwarded: true,
      businessMessageForwardInfo: {
        businessOwnerJid: bisnis
      }
    }
  }, { quoted: m });
}
} else {
  conn.sendMessage(m.chat, {
    text: list2,
    contextInfo: {
    mentionedJid: [m.sender],
      externalAdReply: {
        title: "𝗚𝗘𝗥𝗥𝗬 𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘",
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
  conn.sendFile(m.chat, './mp3/menu.mp3', '', null, m, true, null);
}
          } else if (perintah === 'all') {
    let name = m.pushName || conn.getName(m.sender)
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    const allTagsAndHelp = Object.keys(tagCount).map(tag => {
      const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
        return `│⳻⳻ .${helpItem}`;
      }).join('\n'  + '');
   return `╭─「 *MENU ${tag.toUpperCase()}* 」\n${daftarHelp}\n╰─────────────`;

    }).join('\n\n');
    

    
let all =    `
ʜɪ sᴀʏᴀ ᴇxᴘᴇʀɪᴏɴ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ,
    ᴀᴋᴜ ʙɪsᴀ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ ᴅᴇɴɢᴀɴ ᴋᴇᴍᴀᴍᴘᴜᴀɴ ʏᴀɴɢ sᴀʏᴀ ᴘᴜɴʏᴀ, ᴀᴋᴜ ᴅɪᴄɪᴘᴛᴀᴋᴀɴ ᴏʟᴇʜ ᴅᴄᴏᴅᴇᴍɴᴢᴢ ᴅᴇɴɢᴀɴ ᴛᴜᴊᴜᴀɴ sᴇʙᴀɢᴀɪ ʜɪʙᴜʀᴀɴ.
━━━━━━━━━━━━━━━━━━━━━━━━━━━
*ɴᴀᴍᴀ*: ${namebot}  
*ᴠᴇʀsɪᴏɴ*: ${version} 
*sᴛᴀᴛᴜs*: ${global.opts['self'] ? 'Self' : 'Public'}
*ᴛɪᴍᴇ*: ${await DateNow(new Date)}
*ᴊᴜᴍʟᴀʜ ᴜsᴇʀ*: ${Object.keys(db.data.users).length}  
*ᴍᴇɴᴜ ʟᴇɴɢᴛʜ*: ${Object.keys(tagCount).length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
    + allTagsAndHelp
;
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "");
if (global.menu === 'simple') {
  m.reply(all);
} else if (global.menu === 'doc') {
 conn.sendMessage(m.chat, {
  document: {
    url: "https://wa.me"
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
caption: all,
fileName: await conn.msToDate(process.uptime() * 1000)
,contextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
    businessMessageForwardInfo: {
            businessOwnerJid: bisnis
       }}},{quoted: m});
} else if (global.menu === 'gif') {

  conn.sendMessage(m.chat, { image: { url: gif }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: all,     contextInfo: {

  mentionedJid: [m.sender],
      externalAdReply: {
        title: "ᴇxᴘᴇʀɪᴏɴ ᴍᴅ",
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }}, { quoted: m})
} else if (global.menu === 'payment' ) {
await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 9999999999 * 1000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: all,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
} else if (global.menu === 'edit') {
 const arr = [
 { text: `➳ *L*`, timeout: 200 },
{ text: `➳ *L O*`, timeout: 200 },
{ text: `➳ *L O A*`, timeout: 200 },
{ text: `➳ *L O A D*`, timeout: 200 },
{ text: `➳ *L O A D I*`, timeout: 200 },
{ text: `➳ *L O A D I N*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G . .*`, timeout: 200 },
{ text: `➳ *L O A D I N G .*`, timeout: 200 },
{ text: `➳ *L O A D I N G*`, timeout: 200 },
{ text: `➳ *W E L C O M E*`, timeout: 200 },
{ text: all, timeout: 200 },
  ];
  
let { key } = await conn.sendMessage(m.chat, {
  document: {
    url: "https://wa.me"
  },
  jpegThumbnail: await conn.resize(thumb, 300, 150),
  caption: `➳ *Please Wait...*`,
  fileName: await conn.msToDate(process.uptime() * 1000),
  contextInfo: {
  mentionedJid: [m.sender],
    isForwarded: true,
    businessMessageForwardInfo: {
      businessOwnerJid: bisnis
    }
  }
}, { quoted: m });
  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
  await conn.sendMessage(m.chat, {
    document: {
      url: "https://wa.me"
    },
    jpegThumbnail: await conn.resize(thumb, 300, 150),
    caption: arr[i].text,
    fileName: await conn.msToDate(process.uptime() * 1000),
    edit: key,
    contextInfo: {
     mentionedJid: [m.sender],
      isForwarded: true,
      businessMessageForwardInfo: {
        businessOwnerJid: bisnis
      }
    }
  }, { quoted: m });
}
} else {
  conn.sendMessage(m.chat, {
    text: all,
    contextInfo: {
    mentionedJid: [m.sender],
      externalAdReply: {
        title: namebot,
        body: wm,
        thumbnailUrl: thumb,
        sourceUrl: sourceurl,
        mediaType: 1,
        renderLargerThumbnail: true
      },
    }
  }, { quoted: m });
  conn.sendFile(m.chat, './mp3/menu.mp3', '', null, m, true, m);
}
  } else {
  await conn.reply(m.chat, `*MENU Not found:*`,m);
  }
}

menulist.help = ['menu']
menulist.tags = ['main']
menulist.command = ['menu']
menulist.register = true
module.exports = menulist

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

 function DateNow(date) {
  let offset = 7;
  let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  let jakartaTime = new Date(utc + (3600000 * offset));  
  let month = jakartaTime.getMonth() + 1;
  let day = jakartaTime.getDate();
  let year = jakartaTime.getFullYear();
  let hours = jakartaTime.getHours() < 10 ? "0" + jakartaTime.getHours() : jakartaTime.getHours();
  let minutes = jakartaTime.getMinutes() < 10 ? "0" + jakartaTime.getMinutes() : jakartaTime.getMinutes();
  let seconds = jakartaTime.getSeconds() < 10 ? "0" + jakartaTime.getSeconds() : jakartaTime.getSeconds();
 
  return `*${hours}:${minutes}:${seconds}*`;
};