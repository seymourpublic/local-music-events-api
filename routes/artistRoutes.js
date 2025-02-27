const express = require('express');
const { getAllArtists, createArtist, getArtistById, updateArtist, deleteArtist } = require('../controllers/artistController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Route
router.get('/', getAllArtists);
router.get('/:id', getArtistById);

// Protected Routes (Only organizers can create/update/delete artists)
router.post('/', authenticate, authorizeRoles('organizer'), createArtist);
router.put('/:id', authenticate, authorizeRoles('organizer'), updateArtist);
router.delete('/:id', authenticate, authorizeRoles('organizer'), deleteArtist);

module.exports = router;