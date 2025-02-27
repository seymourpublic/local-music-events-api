const express = require('express');
const { getAllRSVPs, createRSVP, getRSVPById, updateRSVP, deleteRSVP } = require('../controllers/rsvpController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getAllRSVPs);
router.get('/:id', getRSVPById);

// Protected Routes
router.post('/',authenticate, authorizeRoles('organizer'), createRSVP);
router.put('/:id',authenticate, authorizeRoles('organizer'), updateRSVP);
router.delete('/:id',authenticate, authorizeRoles('organizer'), deleteRSVP);

module.exports = router;
