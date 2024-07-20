const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys');

const myrpg = {
    name: 'myrpg',
    command: ['myrpg'],
    help: [
        'myrpg',
    ],
    async execute(m) {
        try {
            const user = global.db.data.users[m.sender];
            if (!user) {
                return m.reply('Kamu belum terdaftar dalam permainan RPG.');
            }

            const status = `Nama: ${m.sender.replace(/@.+/, '')} ${m.sender} @${m.sender.split('@')[0]}\n` +
                `Money: ${user.money}\n` +
                `Bank: ${user.bank}\n` +
                `Inventory: ${user.inventory.length}\n` +
                `Limit: ${user.limit}\n` +
                `Exp: ${user.exp}\n` +
                `Health: ${user.health}\n` +
                `Peringkat: ${user.rank}\n` +
                `Level: ${user.level}\n` +
                `Progres: ${'#'.repeat(user.exp % 100)} ${(user.exp % 100)}%\n` +
                `Premium: ${user.premium ? 'Ya' : 'Tidak'}\n` +
                `Banned: ${user.banned ? 'Ya' : 'Tidak'}\n` +
                `Cupon: ${user.cupon}\n` +
                `TiketM: ${user.tiketm}\n` +
                `TiketC: ${user.tiketc}\n` +
                `Armor: ${user.armor}\n` +
                `Pet: ${user.pet.length}`;

            await m.reply(status);
        } catch (error) {
            console.error(error);
            await m.reply('Terjadi kesalahan dalam memproses perintah.');
        }
    },
};

module.exports = {
    myrpg,
};