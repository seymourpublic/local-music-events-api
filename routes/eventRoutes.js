const express = require('express');
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent, updateEvent  } = require('../controllers/eventController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

// Public Routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);
const upload = multer({ dest: 'uploads/' });

// Protected Routes
router.delete('/:id', authenticate, authorizeRoles('organizer'), deleteEvent);
router.post('/', authenticate, authorizeRoles('organizer'), upload.single('image'), createEvent);
router.put('/:eventId', authenticate, authorizeRoles('organizer'), upload.single('image'), updateEvent);

module.exports = router;
