const express = require('express');
const router = express.Router();

// GET all users (dummy example)
router.get('/profile', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
});

// POST create a user
router.post('/create', (req, res, next) => {
    const { name, age } = req.body;
    if (!name || !age) {
        // Pass error to error handler
        return next(new Error('Name and age are required'));
    }
    res.status(201).json({
        message: 'User created successfully',
        data: { name, age }
    });
});

module.exports = router;
