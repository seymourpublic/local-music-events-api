const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, followUser, getUserProfile, getUserDashboard  } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/follow', followUser);
router.get('/:id', getUserProfile); 
router.get('/dashboard/:userId', getUserDashboard); // Get user dashboard (public)


module.exports = router;
