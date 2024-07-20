const handler = async (m, { conn, text }) => {
  const menu = `
───「 𝗚𝗘𝗥𝗥𝗬 𝗠𝗗 」───
ᴇxᴘᴇʀɪᴏɴ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ ʀᴘɢ
ᴇᴅᴜᴀᴄᴛɪᴏɴ
ᴍᴇᴅɪᴀ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
ғᴜɴ

───「 𝗦𝗘𝗪𝗔 𝗕𝗢𝗧 」───

1. 5K - 15 HARI
2. 10K - BULAN
3. 15K - 2 bulan

───「 𝗕𝗨𝗬 𝗣𝗥𝗘𝗠 」───

4. 5K - 15 HARI
5. 10K - BULAN
6. 15K - 35 HARI

─────────────────
Silahkan ketik angka dari pilihan yang tersedia.
`;

  // Jika tidak ada input teks (belum memilih opsi)
  if (!text) {
    await conn.reply(m.chat, menu, m);

    // Buat handler untuk menangani input berikutnya dari user
    const filter = msg => msg.key.remoteJid === m.key.remoteJid;
    const collector = conn.createMessageCollector(filter, { time: 60000 });

    collector.on('collect', async (msg) => {
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const options = {
        '1': { item: 'Sewa Bot', price: '5K - 15 HARI' },
        '2': { item: 'Sewa Bot', price: '10K - BULAN' },
        '3': { item: 'Sewa Bot', price: '15K - 2 bulan' },
        '4': { item: 'Buy Prem', price: '5K - 15 HARI' },
        '5': { item: 'Buy Prem', price: '10K - BULAN' },
        '6': { item: 'Buy Prem', price: '15K - 35 HARI' }
      };

      const choice = options[text];

      if (!choice) return conn.reply(m.chat, 'Pilihan tidak valid, silahkan pilih antara 1-6.', m);

      const userResponse = `
Number: ${m.sender}
Name: ${conn.getName(m.sender)}
Item: ${choice.item}
Harga: ${choice.price}

Ketik pay Untuk Melakukan Pembayaran
Ketik cancel Untuk Membatalkan Pesanan
`;

      await conn.reply(m.chat, userResponse, m);
    });

    return;
  }

  // Untuk penanganan input selanjutnya seperti "pay" atau "cancel"
  if (text.toLowerCase() === 'pay') {
    const paymentInfo = `
*Payment Owner*
Qris : https://wa.me/p/27031670639765580/62857059457516
Transfer Ke Qris Diatas Lalu Ss Dan Kirimkan Ke Owner

Jika Ingin Bertanya Silahkan Hubungi Owner wa.me/19419318284
`;
    return conn.reply(m.chat, paymentInfo, m);
  }

  if (text.toLowerCase() === 'cancel') {
    const cancelMessage = `
*Terimakasih Telah Berkunjung, Jika Minat Kamu Bisa Order Kok*

_by experion multidevice_
`;
    return conn.reply(m.chat, cancelMessage, m);
  }
}

handler.help = ['experion'];
handler.tags = ['main'];
handler.command = /^experion|rent$/i;

module.exports = handler;