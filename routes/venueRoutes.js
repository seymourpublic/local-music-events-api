const express = require('express');
const { getAllVenues, createVenue, getVenueById, updateVenue, deleteVenue } = require('../controllers/venueController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getAllVenues);
router.get('/:id', getVenueById);

// Protected Routes
router.post('/', authenticate, authorizeRoles('organizer'), createVenue);
router.put('/:id', authenticate, authorizeRoles('organizer'), updateVenue);
router.delete('/:id', authenticate, authorizeRoles('organizer'), deleteVenue);

module.exports = router;
