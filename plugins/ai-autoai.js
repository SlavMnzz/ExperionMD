const axios = require('axios');

let handler = async (m, { text }) => {
    if (!text) throw `*• Example:* .ai *who is Ronaldo*`;

    try {
        const response = await axios.get(`https://aemt.me/openai?text=${encodeURIComponent(text)}`);
        const isi = response.data.result;
        await m.reply(isi);
    } catch (error) {
        console.error("Error fetching data:", error);
        await m.reply("Terjadi kesalahan saat mengambil data dari API.");
    }
}

handler.command = ['ai'];
handler.tags = ["ai"];
handler.help = ['ai'].map(a => a + " *[query]*");

module.exports = handler;