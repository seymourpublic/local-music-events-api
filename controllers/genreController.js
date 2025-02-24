const Genre = require('../models/Genre');

exports.getAllGenres = async (req, res) => {
    try {
        const genres = await genres.find().populate('genre_id');
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGenre = async (req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id).populate('genre_id');
        if (!genre) return res.status(404).json({ message: "genre not found" });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.json({ message: "genre deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
