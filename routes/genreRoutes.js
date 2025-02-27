const express = require('express');
const { getAllGenres, createGenre, getGenreById, updateGenre, deleteGenre } = require('../controllers/genreController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllGenres);
router.post('/', createGenre);
router.get('/:id', getGenreById);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
