const express = require('express');
const { getAllGenres, createGenre, getGenreById, updateGenre, deleteGenre } = require('../controllers/genreController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

//public routes
router.get('/', getAllGenres);
router.get('/:id', getGenreById);

//protected routes
router.post('/', authenticate, authorizeRoles('organizer'), createGenre);
router.put('/:id',authenticate, authorizeRoles('organizer'), updateGenre);
router.delete('/:id',authenticate, authorizeRoles('organizer'), deleteGenre);

module.exports = router;
