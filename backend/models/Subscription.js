const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { type: String, required: true }, // New field for category
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    usageStats: { type: Object },
    renewalDate: { type: Date, required: true } // New field for renewal date
});

subscriptionSchema.methods.inviteUser = async function(userId) {
    if (!this.sharedWith.includes(userId)) {
        this.sharedWith.push(userId);
        await this.save();
    }
};

subscriptionSchema.methods.trackUsage = async function(userId) {
    // Logic to track usage for the user
    if (!this.usageStats[userId]) {
        this.usageStats[userId] = { usageCount: 0 };
    }
    this.usageStats[userId].usageCount += 1;
    await this.save();
};

module.exports = mongoose.model('Subscription', subscriptionSchema);