let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (user.atm == 0) return conn.reply(m.chat, 'Kamu belum mempunyai ATM!', m);

    let bankBalance = user.bank || 0;
    let userName = user.name || m.sender.split('@')[0];
    let userId = m.sender.split('@')[0];

    let bankMessage = `*BANK G-RI KAMU*
🏧 Bank: G-RI
💵 Saldo: ${bankBalance} Money
👤 Nama: ${userName}
🆔 Id: ${userId}`;

    // Send bank details with external ad
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
};

handler.help = ['bank'];
handler.tags = ['rpg'];
handler.command = /^bank$/i;

module.exports = handler;