const express = require('express');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Notification = require('../models/Notification');

const router = express.Router();

// Add Subscription
router.post('/', async (req, res) => {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.status(201).json(newSubscription);
});

// Update Subscription
router.put('/:id', async (req, res) => {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSubscription);
});

// Delete Subscription
router.delete('/:id', async (req, res) => {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Get All Subscriptions
router.get('/', async (req, res) => {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
});

// Invite User to Share Subscription
router.post('/:id/invite', async (req, res) => {
    const { userId } = req.body; // User ID to invite
    const subscription = await Subscription.findById(req.params.id);
    await subscription.inviteUser(userId);

    // Create notification for invited user
    const notification = new Notification({
        userId,
        message: `You have been invited to share the subscription: ${subscription.name}`
    });
    await notification.save();

    res.status(200).json({ message: 'User invited to share subscription' });
});

// Track Usage
router.post('/:id/track', async (req, res) => {
    const { userId } = req.body; // User ID whose usage is being tracked
    const subscription = await Subscription.findById(req.params.id);
    await subscription.trackUsage(userId);

    // Create notification for user whose usage is tracked
    const notification = new Notification({
        userId,
        message: `Your usage for the subscription: ${subscription.name} has been tracked.`
    });
    await notification.save();

    res.status(200).json({ message: 'Usage tracked' });
});

module.exports = router;