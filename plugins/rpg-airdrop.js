const airdropMinMoney = 1000000;
const airdropMaxMoney = 4000000;
const airdropMinLimit = 10;
const airdropMaxLimit = 50;
const airdropMinWood = 250;
const airdropMaxWood = 500;
const airdropMinDiamond = 30;
const airdropMaxDiamond = 300;
const airdropCooldown = 259200000; // 3 days in milliseconds

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let time = user.lastAirdrop + airdropCooldown;
    if (new Date() - user.lastAirdrop < airdropCooldown) {
        throw `Kamu sudah mencari airdrop, coba lagi dalam ${msToTime(time - new Date())}`;
    }

    // Send searching message with external ad
    conn.reply(m.chat, "*Sedang Mencari Airdrop*", m, {
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

    // Wait random time (2-5 seconds)
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000));

    // Send found message with external ad
    conn.reply(m.chat, "*Airdrop Ditemukan*\n── ❓──\n❓❓❓\n❓❓❓\n❓❓❓\n──────", m, {
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

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Tag user and send opening message with external ad
    conn.reply(m.chat, `*(@${m.sender.split('@')[0]}) Sedang Membuka Airdrop*\n──🔑 ──\n🪙 🪙 🪙\n🪙 🪙 🪙\n🪙 🪙 🪙\n──────`, m, {
        mentions: [m.sender],
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

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate random rewards
    let crateReward = "Some Crate"; // Replace this with actual crate logic if needed
    let moneyReward = Math.floor(Math.random() * (airdropMaxMoney - airdropMinMoney + 1)) + airdropMinMoney;
    let limitReward = Math.floor(Math.random() * (airdropMaxLimit - airdropMinLimit + 1)) + airdropMinLimit;
    let woodReward = Math.floor(Math.random() * (airdropMaxWood - airdropMinWood + 1)) + airdropMinWood;
    let diamondReward = Math.floor(Math.random() * (airdropMaxDiamond - airdropMinDiamond + 1)) + airdropMinDiamond;

    // Update user data
    user.money += moneyReward;
    user.limit += limitReward;
    user.wood = (user.wood || 0) + woodReward;
    user.diamond = (user.diamond || 0) + diamondReward;
    user.lastAirdrop = new Date() * 1;

    // Send rewards message with external ad
    conn.reply(m.chat, `*Hadiah Yang Kamu Dapat*\n🎁 Crate: ${crateReward}\n💰 Uang: ${moneyReward}\n🪙 Limit: ${limitReward}\n🪵 Kayu: ${woodReward}\n💎 Berlian: ${diamondReward}\n*Kamu Dapat Mencari Airdrop 3 Hari Sekali*`, m, {
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

handler.help = ['airdrop'];
handler.tags = ['rpg'];
handler.command = /^(airdrop)$/i;
handler.limit = true;

handler.fail = null;

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days = Math.floor(duration / (1000 * 60 * 60 * 24));

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return days + " hari " + hours + " jam " + minutes + " menit " + seconds + " detik";
}