const express = require('express');
const { getAllVenues, createVenue, getVenueById, updateVenue, deleteVenue } = require('../controllers/venueController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllVenues);
router.post('/', createVenue);
router.get('/:id', getVenueById);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

module.exports = router;
