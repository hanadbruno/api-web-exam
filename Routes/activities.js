const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

router.get('/', async (req, res) => {
    // Fetch activities from the database
    const activities = await Activity.find();
    return res.json(activities);
});

// Implement other CRUD operations

module.exports = router;
