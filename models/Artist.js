const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Artist', ArtistSchema);
