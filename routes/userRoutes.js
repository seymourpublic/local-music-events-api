const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, followUser, getUserProfile, getUserDashboard  } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.post('/', createUser);  // Anyone can register
router.get('/:id', getUserProfile);  // User profiles are public

// Protected Routes
router.get('/', authenticate, authorizeRoles('admin'), getAllUsers);  // Only admins can see all users
router.put('/:id', authenticate, authorizeRoles('admin', 'organizer'), updateUser);  // Admins & organizers can update users
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser);  // Only admins can delete users
router.post('/follow', authenticate, followUser);  // Any authenticated user can follow others
router.get('/dashboard/:userId', authenticate, getUserDashboard);  // Only logged-in users can see their dashboard


module.exports = router;
