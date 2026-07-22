const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getNotifications, markRead, unreadCount } = require('../controllers/notiController');

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, markRead);
router.get('/unread-count', protect, unreadCount);

module.exports = router;