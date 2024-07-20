const items = [
    'money', 'bank', 'potion', 'trash', 'wood',
    'rock', 'string', 'petFood', 'emerald',
    'diamond', 'gold', 'iron', 'common',
    'uncommon', 'mythic', 'legendary', 'pet',
];
let confirmation = {};
async function handler(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return conn.reply(m.chat, 'Kamu sedang melakukan transfer!', m, {
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
    let user = global.db.data.users[m.sender];
    const item = items.filter(v => v in user && typeof user[v] == 'number');
    let lol = `Use format ${usedPrefix}${command} [type] [value] [number]
example ${usedPrefix}${command} money 9999 @user

📍 Transferable items
${item.map(v => `${rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim();
    const type = (args[0] || '').toLowerCase();
    if (!item.includes(type)) return conn.reply(m.chat, lol, m, {
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
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
    if (!who) return conn.reply(m.chat, 'Tag salah satu, atau ketik Nomernya!!', m, {
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
    if (!(who in global.db.data.users)) return conn.reply(m.chat, `User ${who} not in database`, m, {
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
    if (user[type] * 1 < count) return conn.reply(m.chat, `Your *${rpg.emoticon(type)}${type}${special(type)}* is less *${count - user[type]}*`, m, {
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
    let txt = `Apakah Anda yakin ingin melakukan transfer\n ✅ (Yes) ❌ (No)\n\n`;
    let confirm = `
*––––––『 TRANSFER 』––––––*
*🗂️ Type:* ${type} ${rpg.emoticon(type)}${special(type)}
*🧮 Count:* ${count} 
*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}

${txt}
⏰ Timeout *60* detik
`.trim();
    let c = wm;
    let { key } = await conn.reply(m.chat, confirm, m, { mentions: [who], contextInfo: {
        externalAdReply: {
            title: namebot,
            body: "",
            thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
            sourceUrl: sig,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    } });
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        key,
        pesan: conn,
        timeout: setTimeout(() => (conn.sendMessage(m.chat, { delete: key }), delete confirmation[m.sender]), 60 * 1000)
    };
};

handler.before = async m => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;
    let { timeout, sender, message, to, type, count, key, pesan } = confirmation[m.sender];
    if (m.id === message.id) return;
    let user = global.db.data.users[sender];
    let _user = global.db.data.users[to];
    if (/(✖️|n(o)?)/g.test(m.text.toLowerCase())) {
        pesan.sendMessage(m.chat, { delete: key });
        clearTimeout(timeout);
        delete confirmation[sender];
        return conn.reply(m.chat, 'Reject', m, {
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
    if (/(✔️|y(es)?)/g.test(m.text.toLowerCase())) {
        let previous = user[type] * 1;
        let _previous = _user[type] * 1;
        user[type] -= count * 1;
        _user[type] += count * 1;
        if (previous > user[type] * 1 && _previous < _user[type] * 1) conn.reply(m.chat, `*––––––『 TRANSFER 』––––––*\n*📊 Status:* Succes\n*🗂️ Type:* ${type}${special(type)} ${rpg.emoticon(type)}\n*🧮 Count:* ${count}\n*📨 To:* @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to], contextInfo: {
            externalAdReply: {
                title: namebot,
                body: "",
                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                sourceUrl: sig,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        } });
        else {
            user[type] = previous;
            _user[type] = _previous;
            conn.reply(m.chat, `*––––––『 TRANSFER 』––––––*\n*📊 Status:* Failted\n*📍 Item:* ${count} ${rpg.emoticon(type)}${type}${special(type)}\n*📨 To:* @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to], contextInfo: {
                externalAdReply: {
                    title: namebot,
                    body: "",
                    thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                    sourceUrl: sig,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            } });
        }
        
        pesan.sendMessage(m.chat, { delete: key });
        clearTimeout(timeout);
        delete confirmation[sender];
    }
};

handler.help = ['transfer', 'tf'].map(v => v + ' [type] [jumlah] [@tag]');
handler.tags = ['rpg'];
handler.command = /^(transfer|tf)$/i;

handler.disabled = false;

function special(type) {
    let b = type.toLowerCase();
    let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '');
    return special;
}

function isNumber(x) {
    return !isNaN(x);
}

module.exports = handler;