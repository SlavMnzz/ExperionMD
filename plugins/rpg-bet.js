const confirmHandler = require('./plugins/judiacc');
const { number } = require('./plugins/utilsjudi');

let confirm = {};

async function handler(m, { conn, args }) {
    if (m.sender in confirm) throw 'Kamu masih melakukan judi, tunggu sampai selesai!!';

    try {
        let user = global.db.data.users[m.sender];
        let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1;
        
        if (user.money < count) return conn.reply(m.chat, '💹 Uang kamu tidak cukup!!', m, {
            contextInfo: {
                externalAdReply: {
                    title: namebot,
                    body: "",
                    thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                    sourceUrl: "https://www.example.com",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                count,
                timeout: setTimeout(() => {
                    conn.reply(m.chat, 'Timed out', m, {
                        contextInfo: {
                            externalAdReply: {
                                title: namebot,
                                body: "",
                                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                                sourceUrl: "https://www.example.com",
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    });
                    delete confirm[m.sender];
                }, 60000)
            };
            let txt = `Apakah anda yakin mau melakukan judi (Y/n)\n\n*Taruhan:* ${count} 💹\n⏰ 60s Timeout`;
            return conn.reply(m.chat, txt, m, {
                contextInfo: {
                    externalAdReply: {
                        title: namebot,
                        body: "",
                        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                        sourceUrl: "https://www.example.com",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        }
    } catch (e) {
        console.error(e);
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender];
            clearTimeout(timeout);
            delete confirm[m.sender];
            conn.reply(m.chat, 'Rejected', m, {
                contextInfo: {
                    externalAdReply: {
                        title: namebot,
                        body: "",
                        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                        sourceUrl: "https://www.example.com",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        }
    }
}

handler.before = async m => {
    await confirmHandler(m, confirm);
};

handler.help = ['judi [jumlah]'];
handler.tags = ['rpg'];
handler.command = /^(judi|bet)$/i;

module.exports = handler;