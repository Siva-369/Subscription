const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
    preferences: { type: Object, default: { notifications: 'in-app' } } // New field for preferences
});

module.exports = mongoose.model('User', userSchema);