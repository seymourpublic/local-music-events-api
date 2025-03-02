const express = require('express');
const { registerUser, getCurrentUser, loginUser, refreshAccessToken, logoutUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Register User
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').isIn(['artist', 'organizer', 'attendee']).withMessage('Invalid role')
    ],
    registerUser
);

// Login User
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    loginUser
);

// Get Current User (Protected)
router.get('/me', authenticate, getCurrentUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
module.exports = router;
