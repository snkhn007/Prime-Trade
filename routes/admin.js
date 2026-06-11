const express = require('express');
const router = express.Router();
const User = require('../model/user');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    const users = await User.find({}, '-password');
    res.json(users);
});

module.exports = router;