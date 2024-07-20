let activeGroups = {};
let inactiveUsers = {};
const checkInterval = 24 * 60 * 60 * 1000; // Check every 24 hours
const notifyTime = 2 * 24 * 60 * 60 * 1000; // Notify after 2 days of inactivity
const kickTime = 3 * 24 * 60 * 60 * 1000; // Kick after 3 days of inactivity

async function checkInactiveUsers(conn) {
    const now = Date.now();
    for (const groupId in activeGroups) {
        const group = activeGroups[groupId];
        const members = group.members;

        for (const memberId of members) {
            const lastActivity = inactiveUsers[memberId]?.lastActivity || now;

            if (now - lastActivity >= notifyTime && now - lastActivity < kickTime) {
                if (!inactiveUsers[memberId]?.notified) {
                    // Notify inactive users
                    conn.sendMessage(groupId, `*LIST MEMBER GA GUNA*\n@${memberId.replace(/@s\.whatsapp\.net/, '')}`, {
                        mentions: [memberId]
                    });
                    inactiveUsers[memberId].notified = true;
                }
            } else if (now - lastActivity >= kickTime) {
                // Kick inactive users
                await conn.groupParticipantsUpdate(groupId, [memberId], 'remove');
                delete inactiveUsers[memberId];
            }
        }
    }
    setTimeout(() => checkInactiveUsers(conn), checkInterval);
}

let cmemberHandler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('Only group owners can activate this feature.');

    const groupId = m.chat;
    if (activeGroups[groupId]) return m.reply('Cmember system is already active in this group.');

    const groupMetadata = await conn.groupMetadata(groupId);
    const members = groupMetadata.participants.map(p => p.id);
    activeGroups[groupId] = { members };
    
    members.forEach(memberId => {
        inactiveUsers[memberId] = { lastActivity: Date.now(), notified: false };
    });

    m.reply('Cmember system activated.');
    checkInactiveUsers(conn);
};

let stopCmemberHandler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('Only group owners can deactivate this feature.');

    const groupId = m.chat;
    if (!activeGroups[groupId]) return m.reply('Cmember system is not active in this group.');

    delete activeGroups[groupId];
    m.reply('Cmember system deactivated.');
};

let onMessageHandler = async (m) => {
    if (m.isGroup && activeGroups[m.chat]) {
        const userId = m.sender;
        if (inactiveUsers[userId]) {
            inactiveUsers[userId].lastActivity = Date.now();
            inactiveUsers[userId].notified = false;
        } else {
            inactiveUsers[userId] = { lastActivity: Date.now(), notified: false };
        }
    }
};

module.exports = {
    cmemberHandler: {
        command: ['cmember'],
        owner: true,
        handler: cmemberHandler
    },
    stopCmemberHandler: {
        command: ['stopcmember'],
        owner: true,
        handler: stopCmemberHandler
    },
    onMessageHandler
};

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " jam " + minutes + " menit " + seconds + " detik";
}