const express = require('express');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Submit Feedback
router.post('/', authMiddleware, async (req, res) => {
    const { subscriptionId, rating, comment } = req.body;
    const feedback = new Feedback({ subscriptionId, userId: req.user.id, rating, comment });
    await feedback.save();
    res.status(201).json(feedback);
});

// Get Feedback for a Subscription
router.get('/:subscriptionId', async (req, res) => {
    const feedback = await Feedback.find({ subscriptionId: req.params.subscriptionId }).populate('userId');
    res.json(feedback);
});

module.exports = router;