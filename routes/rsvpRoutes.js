const express = require('express');
const { getAllRSVPs, createRSVP, getRSVPById, updateRSVP, deleteRSVP } = require('../controllers/rsvpController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllRSVPs);
router.post('/', createRSVP);
router.get('/:id', getRSVPById);
router.put('/:id', updateRSVP);
router.delete('/:id', deleteRSVP);

module.exports = router;
