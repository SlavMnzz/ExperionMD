let handler = async (m, { conn, text, usedPrefix, command, args, isOwner, isAdmin, chat }) => {
    if (!chat) {
        global.db.data.chats[m.chat] = {
            isBanned: false,
            welcome: true,
            autoread: true,
            detect: false,
            sWelcome: 'Selamat datang @user! 👋🏻',
            sBye: 'Selamat Tinggal @user 👋🏻',
            sPromote: '@user telah di promote',
            sDemote: '@user telah di demote',
            delete: true,
            antiVirtex: false,
            antiLink: false,
            badword: false,
            antiSpam: false,
            freply: false,
            antiSticker: false,
            anticall: true,
            stiker: false,
            viewonce: true,
            useDocument: false,
            antiToxic: false,
            expired: 0
        }
    }

    let chatSettings = global.db.data.chats[m.chat];

    if (!isOwner && !isAdmin) {
        throw `*Kamu bukan admin atau owner!*`;
    }

    if (args[0] === 'list') {
        let settingsList = `
*SETTINGS BY GTGNZZ*
> antilink : ${chatSettings.antiLink ? 'on' : 'off'}
> banned : ${chatSettings.isBanned ? 'on' : 'off'}
> welcome : ${chatSettings.welcome ? 'on' : 'off'}
> autoread : ${chatSettings.autoread ? 'on' : 'off'}
> detect : ${chatSettings.detect ? 'on' : 'off'}
> sWelcome : ${chatSettings.sWelcome}
> sBye : ${chatSettings.sBye}
> sPromote : ${chatSettings.sPromote}
> sDemote : ${chatSettings.sDemote}
> delete : ${chatSettings.delete ? 'on' : 'off'}
> antiVirtex : ${chatSettings.antiVirtex ? 'on' : 'off'}
> badword : ${chatSettings.badword ? 'on' : 'off'}
> antiSpam : ${chatSettings.antiSpam ? 'on' : 'off'}
> freply : ${chatSettings.freply ? 'on' : 'off'}
> antiSticker : ${chatSettings.antiSticker ? 'on' : 'off'}
> anticall : ${chatSettings.anticall ? 'on' : 'off'}
> stiker : ${chatSettings.stiker ? 'on' : 'off'}
> viewonce : ${chatSettings.viewonce ? 'on' : 'off'}
> useDocument : ${chatSettings.useDocument ? 'on' : 'off'}
> antiToxic : ${chatSettings.antiToxic ? 'on' : 'off'}
> expired : ${chatSettings.expired}
`.trim();

        m.reply(settingsList);
        return;
    }

    let setting = args[0];
    let value = args[1];

    if (!setting) throw `*Contoh penggunaan:* ${usedPrefix + command} welcome true`;

    const updateSetting = (key, value) => {
        if (value === 'on' || value === 'true') {
            chatSettings[key] = true;
        } else if (value === 'off' || value === 'false') {
            chatSettings[key] = false;
        } else {
            throw `Nilai tidak valid untuk ${key}: ${value}`;
        }
    };

    switch (setting.toLowerCase()) {
        case 'isbanned':
        case 'banned':
            updateSetting('isBanned', value);
            break;
        case 'welcome':
            updateSetting('welcome', value);
            break;
        case 'autoread':
            updateSetting('autoread', value);
            break;
        case 'detect':
            updateSetting('detect', value);
            break;
        case 'swelcome':
            chatSettings.sWelcome = args.slice(1).join(' ');
            break;
        case 'sbye':
            chatSettings.sBye = args.slice(1).join(' ');
            break;
        case 'spromote':
            chatSettings.sPromote = args.slice(1).join(' ');
            break;
        case 'sdemote':
            chatSettings.sDemote = args.slice(1).join(' ');
            break;
        case 'delete':
            updateSetting('delete', value);
            break;
        case 'antivirtex':
            updateSetting('antiVirtex', value);
            break;
        case 'antilink':
            updateSetting('antiLink', value);
            break;
        case 'badword':
            updateSetting('badword', value);
            break;
        case 'antispam':
            updateSetting('antiSpam', value);
            break;
        case 'freply':
            updateSetting('freply', value);
            break;
        case 'antisticker':
            updateSetting('antiSticker', value);
            break;
        case 'anticall':
            updateSetting('anticall', value);
            break;
        case 'stiker':
            updateSetting('stiker', value);
            break;
        case 'viewonce':
            updateSetting('viewonce', value);
            break;
        case 'usedocument':
            updateSetting('useDocument', value);
            break;
        case 'antitoxic':
            updateSetting('antiToxic', value);
            break;
        case 'expired':
            chatSettings.expired = Number(value);
            break;
        default:
            throw `Pengaturan tidak valid: ${setting}`;
    }

    m.reply(`Pengaturan *${setting}* telah diperbarui menjadi *${value}*`);
};

// Menambahkan perintah singkat untuk setiap fitur
const commands = [
    'isbanned', 'banned', 'welcome', 'autoread', 'detect', 'swelcome', 'sbye', 'spromote', 'sdemote', 'delete',
    'antivirtex', 'antilink', 'badword', 'antispam', 'freply', 'antisticker', 'anticall', 'stiker', 'viewonce',
    'usedocument', 'antitoxic', 'expired'
];

for (const cmd of commands) {
    handler.help.push(cmd + ' <on/off>');
    handler.command.push(new RegExp(`^(${cmd})\\s*(on|off|true|false)?$`, 'i'));
}

handler.help.push('settings list');
handler.command.push(/^settings\s+list$/i);

handler.tags = ['group'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;