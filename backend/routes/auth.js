const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Get Profile
router.get('/profile', authMiddleware, async (req, res) => {
    res.json(req.user);
});

// Update User Profile
router.put('/profile', authMiddleware, async (req, res) => {
    const { email, password } = req.body;
    const updates = {};
    
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);
    
    await User.findByIdAndUpdate(req.user.id, updates);
    res.status(200).json({ message: 'Profile updated successfully' });
});

module.exports = router;