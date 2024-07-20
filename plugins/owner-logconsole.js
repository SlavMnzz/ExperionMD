let handler = async (m) => {
    // Log message to console
    console.log(`[${new Date().toLocaleString()}] Message from ${m.sender}: ${m.text}`)
}

handler.all = async (m) => {
    // Log all received messages
    console.log(`[${new Date().toLocaleString()}] Message from ${m.sender}: ${m.text}`)
}

module.exports = handler