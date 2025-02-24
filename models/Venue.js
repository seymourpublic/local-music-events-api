const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number }
});

module.exports = mongoose.model('Venue', VenueSchema);
