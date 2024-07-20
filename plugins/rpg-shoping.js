let handler = async (m, { conn, args, command }) => {
    let user = global.db.data.users[m.sender]

    // Harga beli dan jual item
    const itemPrices = {
        potion: { buy: 20000, sell: 100 },
        diamond: { buy: 100000, sell: 1000 },
        common: { buy: 100000, sell: 1000 },
        uncommmon: { buy: 100000, sell: 100 },
        mythic: { buy: 100000, sell: 1000 },
        legendary: { buy: 200000, sell: 5000 },
        sampah: { buy: 120, sell: 5 },
        kayu: { buy: 1000, sell: 400 },
        botol: { buy: 300, sell: 50 },
        kaleng: { buy: 400, sell: 100 },
        kardus: { buy: 400, sell: 50 },
        pisang: { buy: 5500, sell: 100 },
        mangga: { buy: 4600, sell: 150 },
        jeruk: { buy: 6000, sell: 300 },
        anggur: { buy: 5500, sell: 150 },
        apel: { buy: 5500, sell: 400 },
        bibitpisang: { buy: 550, sell: 50 },
        bibitmangga: { buy: 550, sell: 50 },
        bibitjeruk: { buy: 550, sell: 50 },
        bibitanggur: { buy: 550, sell: 50 },
        bibitapel: { buy: 550, sell: 50 },
        gardenboxs: { buy: 65000, sell: 350000 },
        berlian: { buy: 150000, sell: 10000 },
        emasbatang: { buy: 250000, sell: 10000 },
        emasbiasa: { buy: 150000, sell: 15000 },
        phonix: { buy: 1000000000, sell: 1000000 },
        griffin: { buy: 100000000, sell: 100000 },
        kyubi: { buy: 100000000, sell: 100000 },
        naga: { buy: 100000000, sell: 100000 },
        centaur: { buy: 100000000, sell: 100000 },
        panda: { buy: 100000000, sell: 100000 },
        hydra: { buy: 500000000, sell: 100000 },
        anubis: { buy: 680000000, sell: 100000 },
        slime: { buy: 995000000, sell: 100000 },
        goblin: { buy: 1000000000, sell: 100000 },
        orc: { buy: 500000000000000, sell: 100000 },
        kuda: { buy: 50000000, sell: 100000 },
        rubah: { buy: 100000000, sell: 100000 },
        kucing: { buy: 5000000, sell: 50000 },
        serigala: { buy: 50000000, sell: 500000 },
        makananpet: { buy: 50000, sell: 500 },
        makananphonix: { buy: 80000, sell: 5000 },
        makanangriffin: { buy: 80000, sell: 5000 },
        makanannaga: { buy: 150000, sell: 10000 },
        makanankyubi: { buy: 150000, sell: 10000 },
        makananpanda: { buy: 150000, sell: 10000 },
        healtmonster: { buy: 20000 },
        pet: { buy: 150000, sell: 1000 },
        limit: { buy: 25000, sell: 20000 },
        exp: { buy: 550 },
        aqua: { buy: 5000, sell: 1000 },
        iron: { buy: 20000, sell: 5000 },
        string: { buy: 50000, sell: 5000 },
        sword: { buy: 150000, sell: 15000 },
        umpan: { buy: 1500, sell: 100 },
        pancingan: { buy: 5000000, sell: 500000 },
        batu: { buy: 500, sell: 100 },
        ketake: { buy: 15 },
        tiketcoin: { buy: 500 },
        koinexpg: { buy: 500000 },
        eleksirb: { buy: 500 }
    }

    let item = args[1]
    let amount = parseInt(args[2])

    if (command === 'shop') {
        if (args[0] === 'buy' || command === 'buy') {
            if (!itemPrices[item]) return conn.reply(m.chat, 'Item tidak ditemukan!', m)
            if (isNaN(amount) || amount <= 0) return conn.reply(m.chat, 'Jumlah item yang dibeli harus lebih dari 0!', m)
            let price = itemPrices[item].buy * amount
            if (user.money < price) return conn.reply(m.chat, 'Uangmu tidak cukup untuk membeli item ini!', m)
            user.money -= price
            user[item] = (user[item] || 0) + amount
            return conn.reply(m.chat, `Kamu telah membeli ${amount} ${item} seharga ${price}`, m)
        } else if (args[0] === 'sell' || command === 'sell') {
            if (!itemPrices[item]) return conn.reply(m.chat, 'Item tidak ditemukan!', m)
            if (isNaN(amount) || amount <= 0) return conn.reply(m.chat, 'Jumlah item yang dijual harus lebih dari 0!', m)
            if (user[item] < amount) return conn.reply(m.chat, 'Kamu tidak memiliki cukup item ini untuk dijual!', m)
            let price = itemPrices[item].sell * amount
            user.money += price
            user[item] -= amount
            return conn.reply(m.chat, `Kamu telah menjual ${amount} ${item} seharga ${price}`, m)
        } else {
            let shopList = Object.keys(itemPrices).map(item => {
                let buyPrice = itemPrices[item].buy
                let sellPrice = itemPrices[item].sell
                return `• ${item} (Buy: ${buyPrice}, Sell: ${sellPrice})`
            }).join('\n')

            return conn.reply(m.chat, `Daftar Item:\n\n${shopList}\n\nGunakan .shop buy <item> <jumlah> untuk membeli\nGunakan .shop sell <item> <jumlah> untuk menjual`, m, {
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
    }
}
handler.tags = ['rpg']
handler.command = /^shoping|buy|sell$/i

module.exports = handler