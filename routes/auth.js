const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

router.post('/signup',body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    async (req, res) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, email, password } = req.body;
        try {
            // hash storing the password
            const hashed = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashed, role: 'user' });
            // redirecting to login get
            res.redirect('/login');
        } catch (error) {
            res.send("Error: " + error.message);
        }
});

router.post('/login', async (req, res) => {
    const { mail, ps } = req.body;
    try {
        const user = await User.findOne({ email: mail });
        // if user does not exist
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(ps, user.password);
        // if incorrect password
        if (!match) return res.status(401).json({ message: "Wrong password" });

        // if everything valid then generate json web token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );


        // store jwt in cookie
        res.cookie('token', token, { httpOnly: true });
        if (user.role === 'admin') return res.redirect('/admin');

        // redirect to user dashboard
        res.redirect('/dashboard');
    } catch (error) {
        res.send("Error: " + error.message);
    }
});

router.get('/logout', (req, res) => {
    // clear token when logged out
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;