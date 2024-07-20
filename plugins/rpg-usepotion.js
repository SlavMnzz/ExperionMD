const handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let potionCount = parseInt(args[0]);

    if (isNaN(potionCount) || potionCount <= 0) {
        return conn.reply(m.chat, 'Contoh: .usepotion 5', m, {
            contextInfo: {
                externalAdReply: {
                    title: namebot,
                    body: "",
                    thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                    sourceUrl: "https://www.example.com", // Ganti dengan URL iklan yang sesuai
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    if (user.potion < potionCount) {
        return conn.reply(m.chat, 'Potion Anda tidak mencukupi.', m, {
            contextInfo: {
                externalAdReply: {
                    title: namebot,
                    body: "",
                    thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                    sourceUrl: "https://www.example.com", // Ganti dengan URL iklan yang sesuai
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    let healthNeeded = 100 - user.health;
    let healthToAdd = potionCount * 5;

    let initialMessage = await conn.reply(m.chat, 'Sedang Mengambil Potion. . .', m, {
        contextInfo: {
            externalAdReply: {
                title: namebot,
                body: "",
                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                sourceUrl: "https://www.example.com", // Ganti dengan URL iklan yang sesuai
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });

    setTimeout(async () => {
        await conn.relayMessage(m.chat, {
            protocolMessage: {
                key: initialMessage.key,
                type: 14,
                editedMessage: {
                    conversation: `@${m.sender.split('@')[0]} Meminum Potion`
                }
            }
        }, {});

        setTimeout(async () => {
            let finalMessage;
            if (healthToAdd > healthNeeded) {
                let usedPotions = Math.ceil(healthNeeded / 5);
                user.health = 100;
                user.potion -= usedPotions;
                finalMessage = `${usedPotions} Potion Telah Digunakan Dan Darah @${m.sender.split('@')[0]} Telah Penuh`;
            } else {
                user.health += healthToAdd;
                user.potion -= potionCount;
                finalMessage = `${potionCount} Potion Telah Diminum Dan Darah @${m.sender.split('@')[0]} Telah Bertambah ${healthToAdd}`;
            }

            await conn.relayMessage(m.chat, {
                protocolMessage: {
                    key: initialMessage.key,
                    type: 14,
                    editedMessage: {
                        conversation: finalMessage
                    }
                }
            }, {
                contextInfo: {
                    externalAdReply: {
                        title: namebot,
                        body: "",
                        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                        sourceUrl: "https://www.example.com", // Ganti dengan URL iklan yang sesuai
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        }, 2000);
    }, 3000);
};

handler.help = ['use potion <jumlah>'];
handler.tags = ['rpg'];
handler.command = /^(usepotion|usepot|potionuse|use)$/i;
handler.limit = true;
handler.group = true;
handler.fail = null;

module.exports = handler;