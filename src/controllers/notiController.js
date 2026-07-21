const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ recipient: req.userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    }
    catch(error) {
        next(error);
    }
};

const markRead = async (req, res, next) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id);
        if(!notification) {
            throw new AppError('Notification not found', 404);
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json(notification);
    }
    catch(error) {
        next(error);
    }
};

const unreadCount = async (req, res, next) => {
    try {
        const count = await Notification.countDocuments({
            recipient: req.userId,
            isRead: false
        });

        res.status(200).json({
            unread: count
        });
    }
    catch(error) {
        next(error);
    }
};