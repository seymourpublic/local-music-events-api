const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Genre', GenreSchema);
