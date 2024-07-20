let handler = async (m, { conn, participants }) => {
  db.data.redeem = db.data.redeem || '';

  // Fungsi untuk membuat kode acak
  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const newRedeemCode = generateRandomCode(10); // Membuat kode redeem acak dengan panjang 10 karakter
  db.data.redeem = newRedeemCode;

  // Menghitung waktu expired (misalnya 24 jam dari sekarang)
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const formattedExpirationDate = expirationDate.toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });

  // Pesan balasan
  const replyMessage = `============================\n*REDEEM DIBUAT OTOMATIS OLEH GERRY, AYO KLAIM SEKARANG*\n\n🎟️ REDEEM: ${newRedeemCode}\n🕔 EXPIRED: ${formattedExpirationDate}\n\nCLAIM DENGAN CARA\n> .claimredeem ${newRedeemCode}\n============================`;

  m.reply(replyMessage);

  const q = {
    "key": {
      "remoteJid": "status@broadcast",
      "participant": "0@s.whatsapp.net",
      "fromMe": false,
      "id": ""
    },
    "message": {
      "conversation": "Redeem code from owner 👑"
    }
  };

  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isGroup && !chat.read_only && !chat.announce).map(v => v[0]);

  for (let id of groups) {
    let participantIds = participants.map(a => a.id);
    await conn.reply(id, replyMessage, q, { contextInfo: { mentionedJid: participantIds } });
  }
};

handler.help = ["sredeem"];
handler.tags = ["owner"];
handler.command = ["sredeem"];
handler.owner = true;

module.exports = handler;