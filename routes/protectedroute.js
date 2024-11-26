// protectedroute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Protected route that requires authentication
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected content' });
});

module.exports = router;
