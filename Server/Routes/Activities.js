const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const Department = require('../models/department'); // Assuming you've set up the Department model

// Authentication middleware (Assuming you have user data in req.session)
const authenticate = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Authorization middleware (Assuming you have user roles in req.session)
const authorize = (req, res, next) => {
    if (req.session.user.role !== 'manager') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        return res.json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching activities', error });
    }
});

// Create a new activity (Manager only)
router.post('/', authenticate, authorize, async (req, res) => {
    const { name } = req.body;
    try {
        const newActivity = new Activity({ name });
        await newActivity.save();
        return res.status(201).json(newActivity);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating activity', error });
    }
});

// Update an activity (Manager only)
router.put('/:id', authenticate, authorize, async (req, res) => {
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

// Delete an activity (Manager only)
router.delete('/:id', authenticate, authorize, async (req, res) => {
    const activityId = req.params.id;
    try {
        await Activity.findByIdAndRemove(activityId);
        return res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting activity', error });
    }
});

// Add an activity to manager's department (Manager only)
router.post('/add-to-department/:id', authenticate, authorize, async (req, res) => {
    const activityId = req.params.id;
    try {
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const managerDepartment = req.session.user.department; // Assuming this is how you store manager's department
        const department = await Department.findOneAndUpdate(
            { name: managerDepartment },
            { $addToSet: { activities: activityId } }, // Add the activity to department's activities list
            { new: true }
        );

        return res.json(department);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding activity to department', error });
    }
});

// Remove an activity from manager's department (Manager only)
router.delete('/remove-from-department/:id', authenticate, authorize, async (req, res) => {
    const activityId = req.params.id;
    try {
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const managerDepartment = req.session.user.department; // Assuming this is how you store manager's department
        const department = await Department.findOneAndUpdate(
            { name: managerDepartment },
            { $pull: { activities: activityId } }, // Remove the activity from department's activities list
            { new: true }
        );

        return res.json(department);
    } catch (error) {
        return res.status(500).json({ message: 'Error removing activity from department', error });
    }
});

module.exports = router;


