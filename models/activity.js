const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Other activity-related fields
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
