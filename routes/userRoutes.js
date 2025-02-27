const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, followUser, getUserProfile, getUserDashboard  } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Protected Routes
router.post('/', authenticate, authorizeRoles('organizer'),createUser);
router.put('/:id', authenticate, authorizeRoles('organizer'),updateUser);
router.delete('/:id',authenticate, authorizeRoles('organizer'), deleteUser);
router.post('/follow',authenticate, authorizeRoles('organizer'), followUser);
router.get('/:id',authenticate, authorizeRoles('organizer'), getUserProfile); 
router.get('/dashboard/:userId',authenticate, authorizeRoles('organizer'), getUserDashboard); // Get user dashboard (public)


module.exports = router;
