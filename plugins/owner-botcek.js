let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) return conn.reply(m.chat, 'Perintah ini hanya dapat digunakan oleh owner.', m)

  if (global.botRunning) {
    return conn.reply(m.chat, `Sistem Sedang Berjalan Dari Waktu ${global.botStartTime}`, m)
  }

  const sendMessageToAllGroups = () => {
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
    for (let id of groups) {
      conn.reply(id, 'Reset Timeout 📊')
    }
  }

  // Tandai sistem sebagai berjalan dan simpan waktu mulai
  global.botRunning = true
  global.botStartTime = new Date().toLocaleTimeString()

  // Kirim pesan pertama kali
  sendMessageToAllGroups()

  // Set interval untuk mengirim pesan setiap 30 menit
  global.botInterval = setInterval(() => {
    sendMessageToAllGroups()
  }, 30 * 60 * 1000) // 30 menit dalam milidetik
}

handler.help = ['bot']
handler.tags = ['owner']
handler.command = /^bot$/i
handler.owner = true

module.exports = handler