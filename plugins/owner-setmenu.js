let handler = async (m, { conn, text }) => {
  global.menu = text;

  if (text === 'simple') {
    m.reply('Sukses set menu menjadi simple ✅');
  } else if (text === 'gif') {
    m.reply('Sukses set menu menjadi gif ✅');
  } else if (text === 'payment') {
    m.reply('Sukses set menu menjadi payment ✅');
  } else if (text === 'edit') {
    m.reply('Sukses set menu menjadi pesan edit ✅');
  } else if (text === 'tags') {
    m.reply('Sukses set menu menjadi tags ✅');
  } else if (text === 'button') {
    m.reply('Sukses set menu menjadi button ✅');
  } else {
    m.reply(`Menu berhasil direset‼️\n\n===========================\n*• BERIKUT LIST TAMPILAN MENU *\n• simple : menampilkan menu dengan simpleMenu\n• gif : menampilkan menu dengan Gif\n• payment : menampilkan menu dengan RequestPaymentMessage\n• edit : menampilkan menu dengan pesan edit\n• tags : menampilkan menu dengan tags\n• button : menampilkan menu dengan buttonsMessage\n=========================\n\n*Example:* .setmenu button`);
  }
};

handler.command = handler.help = ['setmenu'];
handler.tags = ['owner'];
handler.rowner = true;

module.exports = handler;