let handler = async (m, { conn }) => {
    let message = `
╭─ *𝗖𝗹𝗮𝗻 𝗦𝘆𝘀𝘁𝗲𝗺 𝗚𝘂𝗶𝗱𝗲*
│ • 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗖𝗹𝗮𝗻:
│   └ ⌨️ .createclan <name>
│      Membuat clan baru dengan biaya 1B money.
│
│ • 𝗝𝗼𝗶𝗻 𝗮 𝗖𝗹𝗮𝗻:
│   └ ⌨️ .joinclan <name>
│      Bergabung dengan clan yang sudah ada.
│
│ • 𝗟𝗲𝗮𝘃𝗲 𝗮 𝗖𝗹𝗮𝗻:
│   └ ⌨️ .leaveclan
│      Keluar dari clan yang saat ini Anda ikuti.
│
│ • 𝗖𝗹𝗮𝗻 𝗜𝗻𝗳𝗼:
│   └ ⌨️ .claninfo <name>
│      Menampilkan informasi tentang clan tertentu.
│
│ • 𝗔𝗱𝗱 𝗦𝘁𝗮𝗳𝗳:
│   └ ⌨️ .addstaff @user
│      Menambahkan anggota sebagai staff. Hanya pemimpin clan yang dapat menggunakan perintah ini.
╰────────────
    `;
    conn.reply(m.chat, message, m);
}

handler.help = ['clan'];
handler.tags = ['rpg'];
handler.command = /^(clan|clanguide)$/i;

module.exports = handler;