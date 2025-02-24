const express = require('express');
const { getAllArtists, createArtist, getArtistById, updateArtist, deleteArtist } = require('../controllers/artistController');
const router = express.Router();

router.get('/', getAllArtists);
router.post('/', createArtist);
router.get('/:id', getArtistById);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;
