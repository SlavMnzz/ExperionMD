const { createHash } = require('crypto');

let handler = async function (m, { text, usedPrefix, command }) {
  conn.register = conn.register ? conn.register : {};
  let user = global.db.data.users[m.sender];
  if (user.registered === true) throw `*🪷 Kamu Belum Terdaftar*`;
  if (!text) return m.reply(Func.example(usedPrefix, command, 'name.umur'));
  let [name, age] = text.split(".");
  if (!name) return m.reply(Func.example(usedPrefix, command, 'name.umur'));
  if (!age) return m.reply(Func.example(usedPrefix, command, 'name.umur'));
  age = parseInt(age);
  if (age > 120) return m.reply('Tua Amat,Ga Mati Mati')
  if (age < 5) return m.reply('Bocill Bobo Sana')
  let sn = createHash('md5').update(m.sender).digest('hex');

  m.reply(`╭─「 *ACCOUNT INFO* 」
│Nama: ${name}
│umur: ${age} years
╰────
Apakah Informasi Kamu Benar?
Ketik *Y* untuk lanjut
ketik *N* untuk batal`)
  conn.register[m.sender] = {
    status: 'PROCESS',
    name: name,
    age: age,
    sn: sn
  };
};

handler.before = async function (m, { conn, usedPrefix, command }) {
  conn.register = conn.register ? conn.register : {};
  if (!m.text) return;
  if (!conn.register[m.sender]) return;
  let user = global.db.data.users[m.sender];
  if (user.registered === true) return;
  if (m.text === "Y") {
    const success =
      `*✅ DAFTAR BERHASIL*\n` +
      `Terimakasih Sudah Daftar${namebot}, Profile Kamu Kini Sudah Terdaftar, Silahkan Ketik *.menu* Untuk Melihat Menu${namebot} 

╭─「 *ACCOUNT INFO* 」
│Nama: ${conn.register[m.sender].name}
│Umur: ${conn.register[m.sender].age} years
╰────
Serial Number: ${conn.register[m.sender].sn}`

    await m.reply(success);
    conn.register[m.sender].status = 'FINISH';
    user.name = conn.register[m.sender].name;
    user.age = conn.register[m.sender].age;
    user.regTime = +new Date();
    user.sn = conn.register[m.sender].sn;
    user.registered = true;
    delete conn.register[m.sender];
  } else if (m.text === "N") {
    m.reply('*✅ Daftar Dibatalkan*');
    delete conn.register[m.sender];
  } else m.reply('*❕ Ketik Y/N*');
};

handler.help = ['register', 'reg', 'daftar'].map(v => v + ' *[name.age]*');
handler.tags = ['main'];
handler.command = ['register', 'reg', 'daftar']

module.exports = handler;