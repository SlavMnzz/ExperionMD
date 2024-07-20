const handler = async (m, { conn }) => {
    // Jika tidak mereply pesan, kirimkan pesan bahwa harus mereply pesan yang ingin dihapus
    if (!m.quoted) return m.reply('*Reply pesan yang ingin dihapus*');
    
    try {
        // Hapus pesan yang di-reply
        await conn.sendMessage(m.chat, { delete: m.quoted });
        await m.reply('*Pesan berhasil dihapus!*');
    } catch (err) {
        await m.reply('*Gagal menghapus pesan!*');
    }
};

handler.help = ['del'];
handler.tags = ['utility'];
handler.command = /^del$/i;

module.exports = handler;