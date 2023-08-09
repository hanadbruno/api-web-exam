const express = require('express');
const router = express.Router();
const Activity = require('../Models/activity');

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        return res.json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching activities', error });
    }
});

// Create a new activity
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newActivity = new Activity({ name });
        await newActivity.save();
        return res.status(201).json(newActivity);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating activity', error });
    }
});

// Update an activity
router.put('/:id', async (req, res) => {
    const activityId = req.params.id;
    const { name } = req.body;
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            activityId,
            { name },
            { new: true }
        );
        return res.json(updatedActivity);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating activity', error });
    }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
    const activityId = req.params.id;
    try {
        await Activity.findByIdAndRemove(activityId);
        return res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting activity', error });
    }
});

module.exports = router;

