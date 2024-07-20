let confirmation = {}
async function handler(m, {
    conn,
    args,
    usedPrefix,
    command
}) {
    if (confirmation[m.sender]) return conn.reply(m.chat, message, m, {
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
    let user = global.db.data.users
    const count = args[0]
    if (!count) return m.reply("⚠️ Masukkan angka jumlah sumbangan.")
    if (isNaN(count)) return conn.reply(m.chat, "⚠️ Jumlah sumbangan harus berupa angka.", m, {
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
    let hasil = formatRupiah(Number(count));
    let txt = `Apakah kamu yakin ingin memberi sumbangan\n✅ (Yes) ❌ (No)`
    let confirm = `😔 Kak bagi sumbangan\ncuma *${hasil}* dong.\n\n${txt}`;
    let { key } = await conn.reply(m.chat, confirm, m, {
        mentions: [m.sender]
    })
    confirmation[m.sender] = {
        sender: m.sender,
        message: m,
        count,
        hasil,
        key,
        pesan: conn,
        timeout: setTimeout(() => (conn.sendMessage(m.chat, { delete: key }), delete confirmation[m.sender]), 60 * 1000)
    }
}

handler.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let {
        timeout,
        sender,
        message,
        count,
        hasil,
        key,
        pesan
    } = confirmation[m.sender]
    if (m.id === message.id) return
    let user = global.db.data.users[m.sender]
    let _user = global.db.data.users[sender]
    
    if (/(✔️|y(es)?)/g.test(m.text.toLowerCase())) {
    if (m.sender !== sender) {
        user.money -= count * 1
        _user.money += count * 1
        conn.reply(m.chat, `✨ Terima kasih!\n${m.name.split('\n')[0]} telah memberi sumbangan sebesar *${hasil}*`, m, {
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
        pesan.sendMessage(m.chat, { delete: key })
        clearTimeout(timeout)
        delete confirmation[sender]
        } else {
    await conn.reply(m.chat, "⚠️ Tidak bisa meminta sumbangan ke diri anda sendiri!.", m, {
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
    if (/(✖️|n(o)?)/g.test(m.text.toLowerCase())) {
        conn.reply(m.chat, `😔 ${m.name.split('\n')[0]} kamu berdosa banget kak...`, m, {
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
        pesan.sendMessage(m.chat, { delete: key })
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

handler.help = ['sumbangan'].map(v => v + ' [jumlah]')
handler.tags = ['rpg']
handler.command = /^(sumbangan)$/i
handler.disabled = false

module.exports = handler

function isNumber(x) {
    return !isNaN(x)
}

function formatRupiah(number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}