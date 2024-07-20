let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format .mentransfer <type> <jumlah> <@tag>\n📍contoh penggunaan: *.mentransfer money 100 @tag*\n\n*List yang bisa di transfer :*\n💹Money\n💳 Tabungan\n🥤Potion\n🗑️Sampah\n💎Diamond\n📦Common\n🛍️Uncommon\n🎁Mythic\n🧰Legendary\n🕸️string\n🪵kayu\n🪨batu\n⛓iron`, m, {
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
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = global.db.data.users
        switch (type) {
            case 'money':
                if (global.db.data.users[m.sender].money >= count * 1) {
                    try {
                        global.db.data.users[m.sender].money -= count * 1
                        global.db.data.users[who].money += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].money += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Money sebesar ${count}`.trim(), m)
                break
            case 'tabungan':
                if (global.db.data.users[m.sender].atm >= count * 1) {
                   try {
                       global.db.data.users[m.sender].atm -= count * 1
                       global.db.data.users[who].atm += count * 1
                       conn.reply(m.chat, `Berhasil mentransfer Uang dari bank sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].atm += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                               conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Limit kamu tidak mencukupi untuk mentransfer Uang dari Bank sebesar ${count}`, m, {
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
                break
            case 'limit':
                if (global.db.data.users[m.sender].limit >= count * 1) {
                    try {
                        global.db.data.users[m.sender].limit -= count * 1
                        global.db.data.users[who].limit += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer limit sebesar ${count}`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].limit += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Limit kamu tidak mencukupi untuk mentransfer Limit sebesar ${count}`, m, {
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
                break
            case 'potion':
                if (global.db.data.users[m.sender].potion >= count * 1) {
                    try {
                        global.db.data.users[m.sender].potion -= count * 1
                        global.db.data.users[who].potion += count * 1
                        conn.reply(m.chat,  `Berhasil mentransfer ${count} Potion`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].potion += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Potion kamu tidak cukup`, m, {
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
                break
            case 'sampah':
                if (global.db.data.users[m.sender].sampah >= count * 1) {
                    try {
                        global.db.data.users[m.sender].sampah -= count * 1
                        global.db.data.users[who].sampah += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Sampah`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].sampah += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Sampah kamu tidak cukup`, m, {
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
                break
            case 'diamond':
                if (global.db.data.users[m.sender].diamond >= count * 1) {
                    try {
                        global.db.data.users[m.sender].diamond -= count * 1
                        global.db.data.users[who].diamond += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Diamond`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].diamond += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Diamond kamu kamu tidak cukup`, m, {
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
                break
            case 'common':
                if (global.db.data.users[m.sender].common >= count * 1) {
                    try {
                        global.db.data.users[m.sender].common -= count * 1
                        global.db.data.users[who].common += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Common Crate`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].common += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Common crate kamu kamu tidak cukup`, m, {
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
                break
            case 'uncommon':
                if (global.db.data.users[m.sender].uncommon >= count * 1) {
                    try {
                        global.db.data.users[m.sender].uncommon -= count * 1
                        global.db.data.users[who].uncommon += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Uncommon Crate`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].uncommon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uncommon crate kamu kamu tidak cukup`, m, {
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
                break
            case 'mythic':
                if (global.db.data.users[m.sender].mythic >= count * 1) {
                    try {
                        global.db.data.users[m.sender].mythic -= count * 1
                        global.db.data.users[who].mythic += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Mythic crate`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].mythic += count * 1
                        conn.reply(m.chat, 'Gagal Menstransfer', m, {
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
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat,`Mythic crate kamu kamu tidak cukup`, m, {
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
                break
            case 'legendary':
                if (global.db.data.users[m.sender].legendary >= count * 1) {
                    try {
                        global.db.data.users[m.sender].legendary -= count * 1
                        global.db.data.users[who].legendary += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Legendary crate`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].legendary += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Legendary crate kamu kamu tidak cukup`, m, {
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
                break
            case 'string':
                if (global.db.data.users[m.sender].string >= count * 1) {
                    try {
                        global.db.data.users[m.sender].string -= count * 1
                        global.db.data.users[who].string += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer string sebesar ${count}`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].string += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer String sebesar ${count}`.trim(), m)
                break
            case 'batu':
                if (global.db.data.users[m.sender].batu >= count * 1) {
                    try {
                        global.db.data.users[m.sender].batu -= count * 1
                        global.db.data.users[who].batu += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer Batu sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].batu += count * 1
                        )
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Batu sebesar ${count}`, m, {
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
                break
            case 'kayu':
                if (global.db.data.users[m.sender].kayu >= count * 1) {
                    try {
                        global.db.data.users[m.sender].kayu -= count * 1
                        global.db.data.users[who].kayu += count * 1
                         conn.reply(m.chat, `Berhasil mentransfer kayu sebesar ${count}`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].kayu += count * 1
                        conn.reply(m.chat, 'Gagal Menstransfer', m, {
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
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Kayu sebesar ${count}`, m, {
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
                break
            case 'iron':
                if (global.db.data.users[m.sender].iron >= count * 1) {
                    try {
                        global.db.data.users[m.sender].iron -= count * 1
                        global.db.data.users[who].iron += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer iron sebesar ${count}`, m, {
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
                    } catch (e) {
                        global.db.data.users[m.sender].iron += count * 1
                        conn.reply(m.chat, 'Gagal Menstransfer', m, {
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
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Iron sebesar ${count}`, m, {
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
                break
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\n📍 Contoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer*\n💹 Money\n💳 Tabungan\n🥤 Potion\n🗑️ Sampah\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Kayu\n🪨 Batu\n⛓️ Iron`, m, {
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
    } catch (e) {
        conn.reply(m.chat, message, m, {
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
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
    
handler.help = ['mentransfer <Args>']
handler.tags = ['rpg']
handler.command = /^(mentransfer|mentf)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

module.exports = handler