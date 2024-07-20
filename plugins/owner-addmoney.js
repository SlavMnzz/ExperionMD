let handler = async (m, { conn, usedPrefix, command, text, args }) => {

    if (!text) throw `• *Example:* ${usedPrefix + command} *[@user & amount]*`

    let [who, amount] = text.split(' ')

    if (!who) throw '*[ ! ] Tag user to add money'

    if (isNaN(amount)) throw '*[ ! ] Only Number*'

    amount = parseInt(amount)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender

    let users = global.db.data.users

    if (!users[user]) users[user] = { money: 0 }

    if (command === 'addmoney') {

        users[user].money += amount

        conn.reply(m.chat, `Successfully added ${amount} money for @${user.split('@')[0]}!`, m)

    } else if (command === 'remmoney') {

        if (amount > users[user].money) {

            users[user].money = 0

            conn.reply(m.chat, `Successfully removed money for @${user.split('@')[0]}. Money is now 0!`, m)

        } else {

            users[user].money -= amount

            conn.reply(m.chat, `Successfully removed ${amount} money for @${user.split('@')[0]}!`, m)

        }

    }

}

handler.help = ['addmoney', 'remmoney'].map(a => a + " *[@user & amount]*")

handler.tags = ['owner']

handler.command = /^(add|rem)money$/i

handler.rowner = true

module.exports = handler