const express = require('express');
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected Routes
router.post('/', authenticate, authorizeRoles('organizer'), createEvent);
router.put('/:id', authenticate, authorizeRoles('organizer'), updateEvent);
router.delete('/:id', authenticate, authorizeRoles('organizer'), deleteEvent);

module.exports = router;
