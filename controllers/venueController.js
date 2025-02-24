const Venue = require('../models/Venue');

exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venues.find().populate('venue_id genre_id created_by');
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createVenue = async (req, res) => {
    try {
        const venue = new Venue(req.body);
        await venue.save();
        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id).populate('venue_id genre_id created_by');
        if (!venue) return res.status(404).json({ message: "Venue not found" });
        res.json(venue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(venue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        await Venue.findByIdAndDelete(req.params.id);
        res.json({ message: "Venue deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
