const express = require('express');
const Payment = require('../models/Payment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Process a Payment
router.post('/', authMiddleware, async (req, res) => {
    const { subscriptionId, amount, userId, sharedWith } = req.body;
    const newPayment = new Payment({ subscriptionId, amount, userId, sharedWith });
    await newPayment.save();
    res.status(201).json(newPayment);
});

// Get Payment History
router.get('/history', authMiddleware, async (req, res) => {
    const payments = await Payment.find({ userId: req.user.id }).populate('subscriptionId');
    res.json(payments);
});

module.exports = router;