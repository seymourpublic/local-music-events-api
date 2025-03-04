const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date_time: { type: Date, required: true },
    venue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    ticket_price: { type: Number, required: true },
    rsvp_link: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String }, // Stores event poster image URL from Firedrop
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
// Compare this snippet from models/Genre.js:
// const mongoose = require('mongoose');