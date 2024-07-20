const { random } = Math;

const islands = {
    emerald: { minLevel: 50, items: ['emerald', 'gold', 'diamond'], healthLoss: 10 },
    coral: { minLevel: 50, items: ['coral', 'pearl', 'fish'], healthLoss: 10 },
    deepwater: { minLevel: 80, items: ['deepsea', 'krakenTentacle', 'sharkTooth'], healthLoss: 20 },
    kingdom: { minLevel: 80, items: ['crown', 'scepter', 'royalJewel'], healthLoss: 20 },
    monlight: { minLevel: 100, items: ['moonstone', 'stardust', 'nightflower'], healthLoss: 30 }
};

const monsters = ['Kraken', 'Sea Serpent', 'Leviathan', 'Hydra', 'Sea Dragon'];

let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender];
    let islandName = text.trim().toLowerCase();

    if (!islandName) {
        let message = 'Contoh Penggunaan: .topulau <nama pulau>\n\nPulau Yang Bisa Kamu Jelajahi\n';
        for (let [name, { minLevel }] of Object.entries(islands)) {
            message += ` - Pulau ${name.charAt(0).toUpperCase() + name.slice(1)} Minimal Level ${minLevel}\n`;
        }
        return conn.reply(m.chat, message, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
    }

    if (!islands[islandName]) return conn.reply(m.chat, 'Pulau tidak ditemukan. Silakan pilih dari emerald, coral, deepwater, kingdom, atau monlight.';

    let island = islands[islandName];
    
    if (user.level < island.minLevel) return conn.reply(m.chat, `Perlu Level ${island.minLevel} Untuk Menuju Ke Pulau ${islandName.charAt(0).toUpperCase() + islandName.slice(1)}`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

    conn.reply(m.chat, `@${m.sender.split('@')[0]} Sedang Berjelajah Ke Pulau ${islandName.charAt(0).toUpperCase() + islandName.slice(1)} Dengan Darah ${user.health}. Tunggu 5 Menit Untuk Melihat Hasil Yang Didapatkan Dari Pulau Itu`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

    setTimeout(() => {
        let success = random() > 0.3; // 70% success rate
        if (success) {
            let items = island.items.map(item => `${item}: ${Math.floor(random() * 10 + 1)}`).join('\n - ');
            let healthLoss = Math.floor(random() * island.healthLoss) + 1;
            user.health = Math.max(user.health - healthLoss, 0);

            conn.reply(m.chat, `Wah Kamu Hebat @${m.sender.split('@')[0]}, Kamu Bisa Pulang Dengan Selamat Dan Membawa Beberapa Barang Curian\n - ${items}\n\nSepertinya Kamu Sebagai Penjelajah Yang Hebat Perlu Istirahat Karena Nyawa Kamu Berkurang ${healthLoss}`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
        } else {
            let monster = monsters[Math.floor(random() * monsters.length)];
            user.health = 0;

            conn.reply(m.chat, `*GERRY NEWS*\n*Telah Ditemukan Sang Penjelajah Dengan Nama @${m.sender.split('@')[0]} Tidak Bisa Pulang Dari Pulau ${islandName.charAt(0).toUpperCase() + islandName.slice(1)} Dengan Selamat Karena Kalah Melawan Monster ${monster} Dan Sekarang Darah Dia 0, Perlu Minum Potion Untuk Mengembalikan Nyawa!!*`, m, {
    contextInfo: {
      externalAdReply: {
        title: namebot,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/0dae30331ff6f03361373.jpg",
        sourceUrl: sig,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
        }
    }, 5 * 60 * 1000); // 5 minutes
};

handler.help = ['topulau <name>'];
handler.tags = ['rpg'];
handler.command = /^(topulau|exploreisland|jelajahpulau)$/i;

module.exports = handler;