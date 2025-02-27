const express = require('express');
const { getEventReviews, createReview } = require('../controllers/reviewController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

//public route
router.get('/:eventId/reviews', getEventReviews); // Get reviews for an event

//protected route
router.post('/:eventId/reviews',authenticate, authorizeRoles('organizer'), createReview); // Add a review (no authentication)

module.exports = router;
