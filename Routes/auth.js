const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Authenticate user
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create session and send response
    req.session.user = user;
    return res.json({ message: 'Login successful' });
});

// Implement logout route

module.exports = router;
