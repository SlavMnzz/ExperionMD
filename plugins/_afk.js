let handler = m => m
handler.before = async function (m, { usedPrefix, participants }) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
• *Kamu Berhenti Afk* ${user.afkReason ? ' *Seletah* ' + user.afkReason : ''}
◦ *Durasi Afk :* ${clockString(new Date - user.afk)}
`.trim())
        user.afk = -1
        user.afkReason = ''
    }

    // Cari semua jids yang disebutkan di pesan
    let mentionedJids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]

    // Cek apakah ada jid pengguna yang disebutkan di pesan
    if (mentionedJids.length > 0) {
        // Loop untuk setiap jid yang disebutkan
        for (let jid of mentionedJids) {
            // Cek apakah jid ada di dalam partisipan
            let targetUser = participants.find(user => user.jid === jid)
            if (!targetUser) continue

            let afkTime = global.db.data.users[jid]?.afk
            let afkReason = global.db.data.users[jid]?.afkReason

            // Validasi alasan AFK
            if (afkTime > -1 && afkReason) {
                // Jika alasan AFK mengandung tag diri sendiri, maka tolak
                if (afkReason.includes(`@${m.sender.split("@")[0]}`)) {
                    m.reply('*Alasan Tidak Valid!*')
                    return true // Stop eksekusi lebih lanjut
                }

                // Kirim pesan bahwa pengguna sedang AFK
                m.reply(`
• *Jangan Tag dia*
◦ *Dia Sedang Afk* *dengan alasan* ${afkReason}
◦ *Durasi Afk:* ${clockString(new Date - afkTime)}
`.trim())
            }
        }
    }
    return true
}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}