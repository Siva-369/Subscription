const express = require('express');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get Notifications for User
router.get('/', authMiddleware, async (req, res) => {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
});

// Mark Notification as Read
router.post('/:id/read', authMiddleware, async (req, res) => {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
});

module.exports = router;