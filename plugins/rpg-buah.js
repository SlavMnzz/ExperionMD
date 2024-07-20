let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender];
    let ini_txt = `[ *GUDANG BUAH KAMU* ]\n\n`;
    ini_txt += `🍌 ${user.pisang} Pisang\n`;
    ini_txt += `🍇 ${user.anggur} Anggur\n`;
    ini_txt += `🥭 ${user.mangga} Mangga\n`;
    ini_txt += `🍊 ${user.jeruk} Jeruk\n`;
    ini_txt += `🍎 ${user.apel} Apel\n\n`;
    ini_txt += `Gunakan command *${usedPrefix}sell* untuk menjual.`;
    conn.reply(m.chat, ini_txt, m, {
        contextInfo: {
            externalAdReply: {
                title: namebot,
                body: "",
                thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
                sourceUrl: "https://www.example.com",
                mediaType: 1, // 1 untuk tipe media gambar
                renderLargerThumbnail: true
            }
        }
    });
};

handler.menufun = ['buah'];
handler.tagsfun = ['rpg'];
handler.command = /^((list)?(buah|fruits?))$/i;

module.exports = handler;