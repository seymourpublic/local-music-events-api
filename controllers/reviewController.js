const Review = require('../models/Review');

// Get all reviews for an event
exports.getEventReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ event_id: req.params.eventId }).populate('user_id', 'name profile_picture');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a review without authentication
exports.createReview = async (req, res) => {
    try {
        const { user_id, event_id, rating, comment } = req.body;

        if (!user_id || !event_id || !rating || !comment) {
            return res.status(400).json({ message: "User ID, Event ID, rating, and comment are required" });
        }

        const review = new Review({ user_id, event_id, rating, comment });
        await review.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
