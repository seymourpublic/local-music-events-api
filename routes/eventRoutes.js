const express = require('express');
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent  } = require('../controllers/eventController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure files are stored in the correct folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.jpg'; // Default to .jpg if no extension
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

// Public Routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

// Protected Routes
router.delete('/:id', authenticate, authorizeRoles('organizer'), deleteEvent);
router.post('/', upload.single('image'), async (req, res) => {
    console.log("Multer uploaded file:", req.file); // Debugging
    createEvent(req, res);
});
router.put('/:eventId', authenticate, authorizeRoles('organizer'), upload.single('image'), updateEvent);

module.exports = router;
