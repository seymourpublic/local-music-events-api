const Artist = require('../models/Artist');

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Event.find().populate('user_id genre_id');
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).populate('user_id genre_id');
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        await Artist.findByIdAndDelete(req.params.id);
        res.json({ message: "Artist deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
