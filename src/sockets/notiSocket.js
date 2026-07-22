const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Notification = require('../models/Notification');

const onlineUsers = new Map();

const notiSocket = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if(!token) {
            return next(new Error('No token provided'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.userId;
            next();
        } 
        catch(error) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`User connected: ${socket.userId}`);

        onlineUsers.set(socket.userId, socket.id);

        await User.findByIdAndUpdate(socket.userId, { isOnline: true });

        socket.on("sendNotification", async ({ recipient, message }) => {
            try {
                const notification = await Notification.create({
                    recipient,
                    message
                });

                const recipientSocketId = onlineUsers.get(recipient);

                if(recipientSocketId) {
                    io.to(recipientSocketId).emit("newNotification",notification);
                }

                console.log(`Notification sent to ${recipient}`);
            } 
            catch(error) {
                console.error(error);
            }
        });

        socket.on('disconnect', async () => {
            onlineUsers.delete(socket.userId);
            await User.findByIdAndUpdate(socket.userId, { isOnline: false });
            console.log(`User disconnected: ${socket.userId}`);
        });
    });
};

module.exports = notiSocket;