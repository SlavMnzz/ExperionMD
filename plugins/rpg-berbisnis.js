let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || m.mentionedJid.length < 3) {
    throw `*Format salah!*\n\nContoh: ${usedPrefix}${command} @tag @tag @tag`;
  }

  let users = global.db.data.users;
  let sender = m.sender;
  let [who1, who2, who3] = m.mentionedJid.slice(0, 3);

  if (
    typeof users[who1] === "undefined" ||
    typeof users[who2] === "undefined" ||
    typeof users[who3] === "undefined"
  ) {
    throw "Ada target yang kamu tag tidak terdaftar di database.";
  }

  if (users[who1].money < 50000 || users[who2].money < 50000 || users[who3].money < 50000) {
    throw "Setiap target yang kamu tag harus memiliki modal minimal 50000.";
  }

  if (users[sender].money < 50000) {
    throw "Kamu tidak memiliki modal minimal 50000.";
  }

  let timers = new Date() - users[sender].lastbisnis;
  if (timers < 0) timers = 0;

  if (timers < 86400000) {
    let waitingTime = 86400000 - timers;
    throw `Kamu sudah berbisnis, silakan tunggu *${clockString(waitingTime)}* lagi.`;
  }

  let money = 50000;
  users[sender].money -= money;
  users[who1].money -= money;
  users[who2].money -= money;
  users[who3].money -= money;

  conn.reply(
    m.chat,
    `Sedang berbisnis...\n\n@${m.sender.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}\n\nMasing-masing meletakkan modal -${money}`,
    m,
    { mentions: [m.sender, who1, who2, who3] }
  );

  setTimeout(() => {
    let profit = Math.floor(Math.random() * 100000);
    let loss = Math.floor(Math.random() * 50000);

    let bisnisMessage = `Statistik bisnis kalian meningkat:\n\n@${
      m.sender.split("@")[0]
    } : +${users[sender].money += profit}\n@${who1.split("@")[0]} : +${users[who1].money += profit}\n@${who2.split("@")[0]} : +${users[who2].money += profit}\n@${who3.split("@")[0]} : +${users[who3].money += profit}`;
    
    conn.reply(m.chat, bisnisMessage, m, { mentions: [m.sender, who1, who2, who3] });

    setTimeout(() => {
      let bisnisMessage = `Statistik bisnis kalian menurun:\n\n@${
        m.sender.split("@")[0]
      } : -${users[sender].money -= loss}\n@${who1.split("@")[0]} : -${users[who1].money -= loss}\n@${who2.split("@")[0]} : -${users[who2].money -= loss}\n@${who3.split("@")[0]} : -${users[who3].money -= loss}`;
      
      conn.reply(m.chat, bisnisMessage, m, { mentions: [m.sender, who1, who2, who3] });

      setTimeout(() => {
        let bisnisMessage = `Statistik bisnis kalian meningkat:\n\n@${
          m.sender.split("@")[0]
        } : +${users[sender].money += profit}\n@${who1.split("@")[0]} : +${users[who1].money += profit}\n@${who2.split("@")[0]} : +${users[who2].money += profit}\n@${who3.split("@")[0]} : +${users[who3].money += profit}`;
        
        conn.reply(m.chat, bisnisMessage, m, { mentions: [m.sender, who1, who2, who3] });

        setTimeout(() => {
          let bisnisMessage = `Statistik bisnis kalian meningkat:\n\n@${
            m.sender.split("@")[0]
          } : +${users[sender].money += profit}\n@${who1.split("@")[0]} : +${users[who1].money += profit}\n@${who2.split("@")[0]} : +${users[who2].money += profit}\n@${who3.split("@")[0]} : +${users[who3].money += profit}`;
          
          conn.reply(m.chat, bisnisMessage, m, { mentions: [m.sender, who1, who2, who3] });

          setTimeout(() => {
            let bisnisMessage = `Sedang berbisnis...\n\n@${m.sender.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}\n\nMasing-masing meletakkan modal -${money}`;
            
            conn.reply(m.chat, bisnisMessage, m, { mentions: [m.sender, who1, who2, who3] });
          }, 14400000); // 4 jam
        }, 28800000); // 8 jam
      }, 43200000); // 12 jam
    }, 72000000); // 20 jam

    users[sender].lastbisnis = new Date * 1;
  }, 60000); // 1 menit
};
handler.help = ["berbisnis"];
handler.tags = ["rpg"];
handler.command = /^berbisnis$/i;
handler.group = true;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}