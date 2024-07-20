const fs = require('fs');

const path = './dataclan.json';

function readDataClan() {

    if (fs.existsSync(path)) {

        const rawData = fs.readFileSync(path);

        return JSON.parse(rawData);

    } else {

        return { clans: {} };

    }

}

function writeDataClan(data) {

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

}

module.exports = { readDataClan, writeDataClan };