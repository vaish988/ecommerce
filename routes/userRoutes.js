// userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const { verifyToken, isAdmin, isVendor, validateProduct } = require('../middleware/auth');
require('dotenv').config();
// Register User (Sign Up)
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'Customer' 
        });

      
        await user.save();

     
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

      
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ name: user.name, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
