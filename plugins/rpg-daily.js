const fs = require('fs')

let handler = async (m, { conn, isPrems }) => {
    if (!isPrems) throw 'Fitur ini hanya tersedia untuk pengguna premium.'

    let user = global.db.data.users[m.sender]
    let time = user.lastdaily + 86400000 // 86400000 milidetik = 1 hari

    if (new Date - user.lastdaily < 86400000) {
        // Pesan jika pengguna sudah mengambil hadiah harian hari ini
        conn.reply(m.chat, `Kamu Sudah Mengambilnya Hari Ini\nTunggu Selama ${msToTime(time - new Date())} Lagi`, m, {
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
        })
        return; // Menghentikan eksekusi kode lebih lanjut jika kondisi terpenuhi
    }

    // Update hadiah harian
    user.exp += prem
    user.money += moneyprem
    user.limit += limitprem

    // Periksa dan update history daily
    if (new Date - user.lastdaily < 2 * 86400000) { // Jika daily dilakukan dalam 2 hari
        user.dailyStreak = (user.dailyStreak || 0) + 1
    } else {
        user.dailyStreak = 1
    }

    // Pesan untuk hadiah harian
    let rewardMessage = `Selamat! Kamu telah mengklaim hadiah harian dan menerima:
    \n- Money: ${moneyprem}
    \n- Exp: ${prem}
    \n- Limit: ${limitprem}`

    // Jika streak harian mencapai kondisi untuk mendapatkan kupon
    if (user.dailyStreak >= daysForCoupon) {
        user.coupon = (user.coupon || 0) + couponReward
        user.dailyStreak = 0 // Reset streak setelah memberikan kupon
        rewardMessage += `\n\nSelamat! Kamu mendapatkan hadiah kupon karena telah melakukan daily selama ${daysForCoupon} hari berturut-turut!`
    } else {
        let daysLeft = daysForCoupon - user.dailyStreak
        rewardMessage += `\n\nLakukan .daily selama ${daysLeft} hari lagi untuk mendapatkan kupon.`
    }

    user.lastdaily = new Date * 1

    // Mengirim pesan balasan dengan menyertakan iklan eksternal
    conn.reply(m.chat, rewardMessage, m, {
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
    })
}

handler.help = ['daily']
handler.tags = ['rpg']
handler.command = /^(harian|daily)$/i

handler.fail = null

module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " Jam " + minutes + " Menit " + seconds + " Detik"
}