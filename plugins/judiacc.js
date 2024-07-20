const { number } = require('./utilsjudi');

module.exports = async (m, confirm) => {
    if (!(m.sender in confirm)) return;
    if (m.isBaileys) return;
    let { timeout, count } = confirm[m.sender];
    let user = global.db.data.users[m.sender];
    let moneyDulu = user.money * 1;
    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase();
    try {
        if (/^(✔️|y(es|a)?)$/i.test(txt)) {
            let Bot = Math.ceil(Math.random() * 91);
            let Kamu = Math.floor(Math.random() * 71);
            let status = 'Kalah';
            if (Bot < Kamu) {
                user.money += count;
                status = 'Menang';
            } else if (Bot > Kamu) {
                user.money -= count;
            } else {
                status = 'Seri';
                user.money += Math.floor(count / 1.5);
            }
            m.reply(`
| *PLAYERS* | *POINT* |
*🤖 BOT:*      ${Bot}
*👤 KAMU:*    ${Kamu}

Kamu *${status}*, kamu ${status == 'Menang' ? `Mendapatkan *+${count * 2}*` : status == 'Kalah' ? `Kehilangan *-${count}*` : `Mendapatkan *+${Math.floor(count / 1.5)}*`} Money 💹
    `.trim());
            clearTimeout(timeout);
            delete confirm[m.sender];
            return true;
        } else if (/^(✖️|no)?$/i.test(txt)) {
            clearTimeout(timeout);
            delete confirm[m.sender];
            m.reply('Rejected');
            return true;
        }

    } catch (e) {
        clearTimeout(timeout);
        delete confirm[m.sender];
        if (moneyDulu > user.money) user.money = moneyDulu;
        m.reply('Error saat melakukan judi (Rejected)');
        return true;
    } finally {
        clearTimeout(timeout);
        delete confirm[m.sender];
        return true;
    }
};