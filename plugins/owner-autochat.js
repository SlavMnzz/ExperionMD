const messages = [
    "Tidak!, Sepertinya Raja Vorlando Telah Datang 🫣",
    "𝗗𝗔𝗥𝗔𝗛 𝗞𝗔𝗠𝗨 𝗕𝗘𝗥𝗞𝗨𝗥𝗔𝗡𝗚?, 𝗠𝗜𝗡𝗨𝗠 .𝗽𝗼𝘁𝗶𝗼𝗻 𝗨𝗡𝗧𝗨𝗞 𝗦𝗘𝗛𝗔𝗧 𝗞𝗘𝗠𝗕𝗔𝗟𝗜 🍶",
    "𝗔𝗬𝗢 𝗔𝗗𝗨 𝗛𝗘𝗪𝗔𝗡 𝗣𝗘𝗟𝗜𝗛𝗔𝗥𝗔𝗔𝗡𝗠𝗨 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗡𝗗𝗔𝗣𝗔𝗧𝗞𝗔𝗡 𝗨𝗔𝗡𝗚 𝗧𝗔𝗠𝗕𝗔𝗛𝗔𝗡 🤠",
    "𝗛𝗨𝗧𝗔𝗡 𝗦𝗘𝗣𝗛𝗜𝗟𝗘𝗦 𝗧𝗘𝗟𝗔𝗛 𝗛𝗔𝗡𝗖𝗨𝗥!, 𝗕𝗨𝗥𝗨𝗔𝗡 𝗔𝗠𝗕𝗜𝗟 𝗕𝗘𝗕𝗘𝗥𝗔𝗣𝗔 𝗜𝗧𝗘𝗠 𝗬𝗔𝗡𝗚 𝗗𝗜𝗕𝗨𝗧𝗨𝗛𝗞𝗔𝗡  𝗬𝗔𝗡𝗚 𝗗𝗜𝗣𝗘𝗥𝗟𝗨𝗞𝗔𝗡",
    "𝗦𝗘𝗟𝗔𝗟𝗨 𝗦𝗜𝗠𝗣𝗔𝗡 𝗨𝗔𝗡𝗚𝗠𝗨 𝗔𝗚𝗔𝗥 𝗧𝗜𝗗𝗔𝗞 𝗗𝗜𝗖𝗨𝗥𝗜",
    "𝗦𝗘𝗠𝗔𝗞𝗜𝗡 𝗧𝗜𝗡𝗚𝗚𝗜 𝗟𝗘𝗩𝗘𝗟 𝗣𝗘𝗧 𝗠𝗨, 𝗦𝗘𝗠𝗔𝗞𝗜𝗡 𝗞𝗨𝗔𝗧 𝗣𝗢𝗪𝗘𝗥 𝗨𝗡𝗧𝗨𝗞 𝗕𝗘𝗥𝗧𝗔𝗥𝗨𝗡𝗚!",
    "𝗛𝗔𝗥𝗧𝗔 𝗞𝗔𝗥𝗨𝗡 𝗗𝗜𝗧𝗘𝗠𝗨𝗞𝗔𝗡 𝗗𝗜 𝗛𝗨𝗧𝗔𝗡 𝗠𝗢𝗡𝗟𝗜𝗚𝗛𝗧!",
    "𝗦𝗘𝗟𝗘𝗦𝗔𝗜𝗞𝗔𝗡 𝗕𝗘𝗕𝗘𝗥𝗔𝗣𝗔 𝗠𝗜𝗦𝗜 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗠𝗕𝗨𝗞𝗔 𝗙𝗜𝗧𝗨𝗥 𝗕𝗔𝗥𝗨!",
    "𝗣𝗘𝗡𝗬𝗜𝗛𝗜𝗥 𝗝𝗔𝗛𝗔𝗧 𝗦𝗘𝗗𝗔𝗡𝗚 𝗠𝗘𝗥𝗔𝗣𝗔𝗟 𝗠𝗔𝗡𝗧𝗥𝗔, 𝗥𝗔𝗖𝗜𝗞 𝗗𝗔𝗡 𝗠𝗜𝗡𝗨𝗠𝗟𝗔𝗛 𝗥𝗔𝗠𝗨𝗔𝗡 𝗬𝗔𝗡𝗚 𝗞𝗔𝗠𝗨 𝗕𝗨𝗔𝗧 𝗨𝗡𝗧𝗨𝗞 𝗕𝗘𝗥𝗧𝗔𝗛𝗔𝗡 𝗗𝗔𝗥𝗜 𝗦𝗘𝗥𝗔𝗡𝗚𝗔𝗡 𝗣𝗘𝗡𝗬𝗜𝗛𝗜𝗥 𝗜𝗧𝗨!",
    "𝗧𝗘𝗥𝗞𝗔𝗗𝗔𝗡𝗚 𝗕𝗘𝗕𝗘𝗥𝗔𝗣𝗔 𝗣𝗘𝗡𝗬𝗜𝗛𝗜𝗥 𝗗𝗔𝗧𝗔𝗡𝗚 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗥𝗔𝗠𝗣𝗢𝗞 𝗨𝗔𝗡𝗚 𝗞𝗔𝗠𝗨 𝗦𝗘𝗖𝗔𝗥𝗔 𝗗𝗜𝗔𝗠 𝗗𝗜𝗔𝗠!",
    "𝗗𝗔𝗣𝗔𝗧𝗞𝗔𝗡 𝗕𝗔𝗟𝗔𝗡𝗖𝗘 𝗦𝗔𝗠𝗣𝗜𝗡𝗚𝗔𝗡 𝗗𝗔𝗡 𝗝𝗔𝗗𝗜𝗟𝗔𝗛 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗨𝗡𝗧𝗨𝗞 𝗖𝗘𝗣𝗔𝗧 𝗞𝗔𝗬𝗔 !",
    "𝗔𝗛 𝗧𝗜𝗗𝗔𝗛, 𝗣𝗘𝗧 𝗞𝗨𝗖𝗜𝗡𝗚 𝗞𝗘𝗟𝗔𝗣𝗔𝗥𝗔𝗡. 𝗔𝗬𝗢 𝗕𝗘𝗥𝗜 𝗠𝗔𝗞𝗔𝗡 𝗦𝗘𝗕𝗘𝗟𝗨𝗠 𝗣𝗢𝗪𝗘𝗥 𝗣𝗘𝗧 𝗠𝗨 𝗛𝗜𝗟𝗔𝗡𝗚!",
    "𝗟𝗔𝗞𝗨𝗞𝗔𝗡 𝗝𝗨𝗔𝗟 𝗕𝗘𝗟𝗜 𝗗𝗜 𝗦𝗛𝗢𝗣!",
    "𝗦𝗘𝗚𝗘𝗥𝗔 𝗕𝗘𝗥𝗜 𝗠𝗔𝗞𝗔𝗡 𝗣𝗘𝗧 𝗖𝗘𝗡𝗧𝗔𝗨𝗥 𝗞𝗔𝗠𝗨 𝗔𝗚𝗔𝗥 𝗣𝗨𝗟𝗜𝗛 𝗞𝗘𝗠𝗕𝗔𝗟𝗜!",
    "𝗥𝗔𝗝𝗔 𝗚𝗢𝗕𝗟𝗜𝗡 𝗦𝗔𝗡𝗚𝗔𝗧 𝗟𝗜𝗡𝗖𝗔𝗛!, 𝗝𝗔𝗡𝗚𝗔𝗡 𝗕𝗜𝗔𝗥𝗞𝗔𝗡 𝗕𝗔𝗥𝗔𝗡𝗚 𝗞𝗔𝗠𝗨 𝗛𝗜𝗟𝗔𝗡𝗚 𝗦𝗘𝗖𝗔𝗥𝗔 𝗧𝗜𝗕𝗔 𝗧𝗜𝗕𝗔",
    "𝗧𝗜𝗡𝗚𝗞𝗔𝗧𝗞𝗔𝗡 𝗗𝗨𝗥𝗔𝗕𝗜𝗟𝗜𝗧𝗬 𝗩𝗘𝗦𝗧 𝗞𝗔𝗠𝗨 𝗔𝗚𝗔𝗥 𝗦𝗘𝗠𝗔𝗞𝗜𝗡 𝗞𝗨𝗔𝗧",
    "𝗕𝗘𝗕𝗘𝗥𝗔𝗣𝗔 𝗕𝗔𝗡𝗚𝗨𝗡𝗔𝗡 𝗧𝗨𝗔 𝗗𝗜𝗧𝗘𝗠𝗨𝗞𝗔𝗡 𝗗𝗜𝗣𝗨𝗟𝗔𝗨!",
    "𝗝𝗨𝗔𝗟 𝗜𝗧𝗘𝗠 𝗬𝗔𝗡𝗚 𝗧𝗜𝗗𝗔𝗞 𝗗𝗜𝗚𝗨𝗡𝗔𝗞𝗔𝗡 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗡𝗗𝗔𝗣𝗔𝗧 𝗟𝗘𝗕𝗜𝗛 𝗕𝗔𝗡𝗬𝗔𝗞 𝗨𝗔𝗡𝗚!",
    "𝗕𝗜𝗔𝗦𝗔𝗡𝗬𝗔 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗠𝗕𝗘𝗥𝗜 𝗛𝗔𝗗𝗜𝗔𝗛 𝗬𝗔𝗡𝗚 𝗠𝗘𝗡𝗔𝗥𝗜𝗞 𝗨𝗡𝗧𝗨𝗞 𝗞𝗔𝗟𝗜𝗔𝗡!",
    "𝗞𝗘𝗟𝗢𝗠𝗣𝗢𝗞 𝗣𝗘𝗡𝗝𝗔𝗥𝗔𝗛 𝗧𝗘𝗟𝗔𝗡𝗚 𝗗𝗔𝗧𝗔𝗡𝗚, 𝗦𝗘𝗠𝗕𝗨𝗡𝗬𝗜 𝗔𝗧𝗔𝗨 𝗟𝗔𝗪𝗔𝗡?",
    "𝗝𝗔𝗡𝗚𝗔𝗡 𝗕𝗜𝗔𝗥𝗞𝗔𝗡 𝗢𝗥𝗔𝗡𝗚 𝗟𝗔𝗜𝗡 𝗠𝗘𝗡𝗗𝗔𝗣𝗔𝗧 𝗧𝗢𝗣 𝗔𝗖𝗛𝗜𝗘𝗩𝗘𝗠𝗘𝗡𝗧!",
    "𝗛𝗔𝗛?, 𝗠𝗨𝗦𝗜𝗠 𝗚𝗨𝗚𝗨𝗥 𝗧𝗘𝗟𝗔𝗛 𝗧𝗜𝗕𝗔?. 𝗪𝗔𝗞𝗧𝗨 𝗬𝗔𝗡𝗚 𝗧𝗘𝗣𝗔𝗧 𝗨𝗡𝗧𝗨𝗞 𝗕𝗘𝗥𝗦𝗔𝗡𝗧𝗔𝗜 𝗦𝗔𝗠𝗕𝗜𝗟 𝗠𝗘𝗠𝗔𝗡𝗖𝗜𝗡𝗚",
    "𝗔𝗠𝗕𝗜𝗟 𝗧𝗢𝗡𝗚𝗞𝗔𝗧 𝗟𝗨𝗭𝗛𝗜𝗥𝗢 𝗗𝗔𝗥𝗜 𝗡𝗘𝗡𝗘𝗞 𝗦𝗜𝗛𝗜𝗥 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗡𝗚𝗨𝗔𝗦𝗔𝗜 𝗗𝗨𝗡𝗜𝗔!",
    "𝗗𝗔𝗣𝗔𝗧𝗞𝗔𝗡 𝗔𝗞𝗦𝗘𝗦 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗨𝗡𝗧𝗨𝗞 𝗠𝗘𝗡𝗚𝗚𝗨𝗡𝗔𝗞𝗔𝗡 𝗦𝗘𝗠𝗨𝗔 𝗙𝗜𝗧𝗨𝗥 𝗔𝗚𝗔𝗥 𝗟𝗘𝗕𝗜𝗛 𝗚𝗔𝗠𝗣𝗔𝗡𝗚 𝗠𝗘𝗡𝗝𝗔𝗗𝗜 𝗧𝗢𝗣 𝗚𝗟𝗢𝗕𝗔𝗟!",
    "𝗦𝗘𝗟𝗔𝗟𝗨 𝗣𝗔𝗡𝗧𝗔𝗨 𝗔𝗞𝗧𝗜𝗩𝗜𝗧𝗔𝗦 𝗧𝗘𝗠𝗔𝗡𝗠𝗨!, 𝗕𝗜𝗦𝗔 𝗝𝗔𝗗𝗜 𝗜𝗧𝗨 𝗠𝗘𝗡𝗖𝗨𝗥𝗜𝗚𝗔𝗞𝗔𝗡!",
    "𝗝𝗔𝗗𝗜𝗟𝗔𝗛 𝗔𝗗𝗩𝗘𝗡𝗧𝗨𝗥𝗘 𝗧𝗘𝗥𝗕𝗔𝗜𝗞!",
    "𝗔𝗗𝗨 𝗣𝗘𝗧 𝗞𝗔𝗠𝗨 𝗦𝗘𝗞𝗔𝗥𝗔𝗡𝗚!",
    "𝗛𝗔𝗟𝗟𝗢 𝗩𝗘𝗡𝗗𝗢𝗥𝗔!"
];

let isRunning = false;  // Variable to control the running state of the function

let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) {
        return conn.reply(m.chat, '*Kamu tidak memiliki izin untuk menjalankan perintah ini.*', m);
    }

    if (isRunning) {
        return conn.reply(m.chat, '*Sistem randomchat sudah berjalan.*', m);
    }

    isRunning = true;  // Set the running state to true

    const sendRandomMessages = async () => {
        while (isRunning) {  // Infinite loop to keep sending messages
            let randomMessage = messages[Math.floor(Math.random() * messages.length)];
            let randomDelay = Math.floor(Math.random() * (2400000 - 900000 + 1)) + 900000;

            // Ambil pengguna acak dari database
            let users = Object.keys(global.db.data.users);
            let randomUser = users[Math.floor(Math.random() * users.length)];
            let taggedMessage = randomMessage.replace('@tagusersecaraacak', `@${randomUser.split('@')[0]}`);

            await conn.reply(m.chat, taggedMessage, m, {
                mentions: [randomUser]
            });

            await new Promise(resolve => setTimeout(resolve, randomDelay));
        }
    };

    sendRandomMessages().catch(err => {
        console.error(err);
        conn.reply(m.chat, '*Terjadi kesalahan saat mengirim pesan.*', m);
        isRunning = false;  // Reset the running state in case of error
    });
};

handler.help = ['Informasi'];
handler.tags = ['owner'];
handler.command = /^(🕵️)$/i;

handler.owner = true;

module.exports = handler;