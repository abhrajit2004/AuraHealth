const initializeSocket = (io) => {
    io.on('connection', (socket) => {

        socket.on('send-message', (message) => {
            const broadcastMessage = { ...message, sender: "user 2" };
            socket.broadcast.emit('receive-message', broadcastMessage);
        });

        socket.on('disconnect', () => {
            console.log(`user disconnected : ${socket.id}`);
        });
    });
}

module.exports = initializeSocket;