const express = require('express');
const { getEventReviews, createReview } = require('../controllers/reviewController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:eventId/reviews', getEventReviews); // Get reviews for an event
router.post('/:eventId/reviews', createReview); // Add a review (no authentication)

module.exports = router;
