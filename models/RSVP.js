const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Going', 'Interested', 'Not Going'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RSVP', RSVPSchema);
