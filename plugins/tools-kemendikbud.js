const fetch = require('node-fetch');

const handler = async (m, { conn, text }) => {
  if (!text) throw `*_Masukan Nama Mahasiswa/Siswa Yang Ingin Kamu Cari !_*`;
  conn.reply(m.chat, 'Sedang mencari Orangnya... Silahkan tunggu', m);
  try {
    const res = await fetch('https://api-frontend.kemdikbud.go.id/hit_mhs/' + text);
    if (!res.ok) throw 'Tidak Ditemukan';
    const json = await res.json();
    let message = '';

    json.mahasiswa.forEach(data => {
      const nama = data.text;
      const websiteLink = data['website-link'];
      const website = `https://pddikti.kemdikbud.go.id${websiteLink}`;
      message += `\nNama = ${nama}\n\nData Ditemukan pada website = ${website}\n\n\n`;
    });

    const mySecret = 'Nomer kamu';
    conn.reply(m.chat, message, m);
    conn.reply(m.chat, `JANGAN LUPA SUPPORT DEVELOPERNYA\nXnuvers007\nhttps://saweria.co/xnuvers007\n\nfollow Me On github\nhttps://github.com/Xnuvers007\nDana = ${mySecret}`, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mencari informasi mahasiswa/siswa. Mohon coba lagi nanti.', m);
  }
};

handler.help = ['mhs <nama>', 'mhs <nim>'];
handler.tags = ['internet'];
handler.command = /^(mahasiswa|mhs|mhssiswa|msiswa|mhsiswa|pddikti|dikti)$/i;

module.exports = handler;