const timeout = 1800000;

let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender];
    let apelu = user.bibitapel;
    let angguru = user.bibitanggur;
    let manggau = user.bibitmangga;
    let pisangu = user.bibitpisang;
    let jeruku = user.bibitjeruk;
    let time = user.lastberkebon + timeout;

    if (apelu === 0 || angguru === 0 || manggau === 0 || pisangu === 0 || jeruku === 0) {
        return conn.reply(m.chat, `*Pastikan kamu memiliki semua bibit*\n*Seperti Bibit Apel, Bibit Mangga, Bibit Jeruk, Bibit Pisang, Bibit Anggur*\n\nKetik :\n${usedPrefix}shop buy bibitmangga 500\n\n*List*\nbibitmangga\nbibitanggur\nbibitpisang\nbibitjeruk\nbibitapel`, m, {
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

    if (new Date - user.lastberkebon < timeout) {
        throw `Anda sudah menanam\nMohon tunggu hasil panenmu\nTunggu selama ${msToTime(time - new Date())} lagi`;
    }

    if (user.bibitmangga > 499 && user.bibitapel > 499 && user.bibitpisang > 499 && user.bibitjeruk > 499 && user.bibitanggur > 499) {
        let pisangpoin = Math.floor(Math.random() * 500);
        let anggurpoin = Math.floor(Math.random() * 500);
        let manggapoin = Math.floor(Math.random() * 500);
        let jerukpoin = Math.floor(Math.random() * 500);
        let apelpoin = Math.floor(Math.random() * 500);

        user.pisang += pisangpoin;
        user.anggur += anggurpoin;
        user.mangga += manggapoin;
        user.jeruk += jerukpoin;
        user.apel += apelpoin;
        user.tiketcoin += 1;
        user.bibitpisang -= 500;
        user.bibitanggur -= 500;
        user.bibitmangga -= 500;
        user.bibitjeruk -= 500;
        user.bibitapel -= 500;
        user.lastberkebon = new Date().getTime();

        conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${pisangpoin} Pisang\n+${manggapoin} Mangga\n+${anggurpoin} Anggur\n+${jerukpoin} Jeruk\n+${apelpoin} Apel\n+1 Tiketcoin`, m, {
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

        setTimeout(() => {
            conn.reply(m.chat, `Waktunya berkebon lagi kak 😅`, m, {
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
        }, timeout);
    } else {
        if (user.bibitmangga <= 499) return m.reply(`Pastikan bibit mangga kamu *500* untuk bisa berkebon`);
        if (user.bibitapel <= 499) return m.reply(`Pastikan bibit apel kamu *500* untuk bisa berkebon`);
        if (user.bibitpisang <= 499) return m.reply(`Pastikan bibit pisang kamu *500* untuk bisa berkebon`);
        if (user.bibitjeruk <= 499) return m.reply(`Pastikan bibit jeruk kamu *500* untuk bisa berkebon`);
        if (user.bibitanggur <= 499) return m.reply(`Pastikan bibit anggur kamu *500* untuk bisa berkebon`);
    }
};

handler.help = ['berkebon'];
handler.tags = ['rpg'];
handler.command = /^(berkebon)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.limit = true;
handler.exp = 0;
handler.money = 0;

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " jam " + minutes + " menit " + seconds + " detik";
}