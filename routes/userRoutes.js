const express = require('express');
const { registerUser, updateUserProfile, getAllUsers, createUser, getUserById, updateUser, deleteUser, followUser, getUserProfile, getUserDashboard, getUserNotifications  } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');


const upload = multer({ dest: 'uploads/' }); // Temp storage before upload 
// Public Routes
router.post('/', createUser);  // Anyone can register
router.get('/:id', getUserProfile);  // User profiles are public
router.post('/register', upload.single('profile_picture'), registerUser);
router.put('/:userId/profile', upload.single('profile_picture'), updateUserProfile);

// Protected Routes
router.get('/', authenticate, authorizeRoles('admin'), getAllUsers);  // Only admins can see all users
router.put('/:id', authenticate, authorizeRoles('admin', 'organizer'), updateUser);  // Admins & organizers can update users
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser);  // Only admins can delete users
router.post('/follow', authenticate, followUser);  // Any authenticated user can follow others
router.get('/dashboard/:userId', authenticate, getUserDashboard);  // Only logged-in users can see their dashboard
router.get('/:userId/notifications', authenticate, getUserNotifications);

module.exports = router;
