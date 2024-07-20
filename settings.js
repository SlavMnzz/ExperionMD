
global.owner = [
  ["6285640624288"],
]; 

global.numberbot = "6285795406671";
global.nameowner = "𝙶𝚃𝙶𝙽𝚉𝚉";
global.nomorown = "6285640624288";

/*Ini Isi dengan Payment kalian masing masing*/
global.dana = "6285725766522";
global.pulsa = "6285725917791";
global.ovo = "-";

/*Apa Itu apikey ??*/
global.APIs = {};
global.APIKeys = {};
global.ocrapi = "314b4b8b2d88957";

//Other Settings
global.namebot = "ᴇxᴘᴇʀɪᴏɴ ᴀɪ";
global.title = "𝗕𝗬 𝗚𝗧𝗚𝗡𝗭𝗭"
global.sgc = "https://chat.whatsapp.com/JkKQ2LcGkXA1t6ndVxXymd";
global.isPairing = true; //Mau pake pairing? true = idup, false = mati
global.sig = "https://chat.whatsapp.com/JkKQ2LcGkXA1t6ndVxXymd";
global.swa = "wa.me/19419318284";
global.version = "14.05";
global.access_denied = "https://telegra.ph/file/785d0deb5f055982c637f.jpg";

global.wm = "ʙʏ ᴅᴄᴏᴅᴇᴍɴᴢᴢ";
global.done = "𝗦𝗨𝗗𝗔𝗛 𝗞𝗔𝗞";
global.icon = "https://telegra.ph/file/0490fffa82e966d6f849e.png";
global.fla = "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
global.wait = "ᴡᴀɪᴛɪɴɢ. . .";
global.eror = "`ᴇʀʀᴏʀ ᴄᴏᴍᴍᴀɴᴅ ғᴀɪʟᴇᴅ";
global.packname = "© ᴇxᴘᴇʀɪᴏɴ ᴍᴅ";
global.author = "ᴍᴀᴅᴇ ʙʏ ᴅᴄᴏᴅᴇᴍɴᴢᴢ";

//Ini Isi pakai video & poto lu
global.gif = "https://telegra.ph/file/0490fffa82e966d6f849e.png"; 
global.thumb = "https://telegra.ph/file/0490fffa82e966d6f849e.png";
global.multiplier = 45;
global.sourceurl = 'https://chat.whatsapp.com/JkKQ2LcGkXA1t6ndVxXymd'

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      petFood: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

const Jimp = require('jimp');
const fetch = require('node-fetch');

let resizeThumb =  resize(thumb, 300, 250)
global.Thumbnails = resizeThumb;

/*====[ FAKE THUMBNAIL ACCESS DENIED ]======*/

global.danied = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '1203631984491156557@newsletter',
      newsletterName: "ꏂꉧꉣꏂꋪ꒐ꄲꋊ ꂵ꒯",
      serverMessageId: -1
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `ᴀᴄᴄᴇss ᴅᴇɴɪᴇᴅ`,
      body: null,
      thumbnailUrl: access_denied,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}

/*========[ GLOBAL ADREPLY ]============*/
global.adReply = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '1203631798449115557@newsletter',
      newsletterName: "ᴇxᴘᴇʀɪᴏɴ ᴍᴅ",
      serverMessageId: -1
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `ᴇxᴘᴇʀɪᴏɴ ᴀɪ`,
      body: wm,
      thumbnailUrl: thumb,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}

/*=========[ FAKE IG ( SMALL AD REPLY ) ]==============*/

global.fakeig = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '12036319844911758557@newsletter',
      newsletterName: "ᴇxᴘᴇʀɪᴏɴ ᴍᴅ",
      serverMessageId: -1         
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `ꏂꉧꉣꏂꋪ꒐ꄲꋊ ꂵ꒯`,
      body: wm,
      thumbnailUrl: icon,
      sourceUrl: thumb,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  }
}

async function resize(url, width, height, referer = null) {
  try {
    const fetchOptions = {
      redirect: 'follow',
      headers: {},
    };

    if (referer) {
      fetchOptions.headers['Referer'] = referer;
    }

    const response = await fetch(url, fetchOptions);

    if (response.ok) {
      const finalUrl = response.url;
      const arrayBuffer = await response.arrayBuffer();
      return await Jimp.read(Buffer.from(arrayBuffer)).then(image => image.resize(width, height).getBufferAsync(Jimp.MIME_JPEG));
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);

    try {
      const undiciFetchOptions = {
        redirect: 'follow',
        headers: {},
      };

      if (referer) {
        undiciFetchOptions.headers['Referer'] = referer;
        }

      const arrayBuffer = await undiciFetch(url, undiciFetchOptions).then(response => response.arrayBuffer());
      return await Jimp.read(Buffer.from(arrayBuffer)).then(image => image.resize(width, height).getBufferAsync(Jimp.MIME_JPEG));
    } catch (retryError) {
      console.error('Retry Error:', retryError.message);
      return Buffer.from([]);
    }
  }
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

let fs = require('fs');
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update settings.js");
  delete require.cache[file];
  require(file);
});