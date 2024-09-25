const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');

const checkRenewals = async () => {
    const today = new Date();
    const upcomingRenewals = await Subscription.find({
        renewalDate: { $gte: today, $lt: new Date(today.setDate(today.getDate() + 7)) } // Next 7 days
    });

    for (const subscription of upcomingRenewals) {
        for (const userId of subscription.sharedWith) {
            const notification = new Notification({
                userId,
                message: `Reminder: Your subscription for ${subscription.name} is due for renewal on ${subscription.renewalDate.toLocaleDateString()}.`
            });
            await notification.save();
        }
    }
};

// Schedule this function to run daily using a job scheduler like node-cron