const RSVP = require('../models/RSVP');

// Get all RSVPs
exports.getAllRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find().populate('event_id user_id');
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new RSVP
exports.createRSVP = async (req, res) => {
    try {
        const rsvp = new RSVP(req.body);
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an RSVP by ID
exports.getRSVPById = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id).populate('event_id user_id');
        if (!rsvp) return res.status(404).json({ message: "RSVP not found" });
        res.json(rsvp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an RSVP by ID
exports.updateRSVP = async (req, res) => {
    try {
        const rsvp = await RSVP.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(rsvp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an RSVP by ID
exports.deleteRSVP = async (req, res) => {
    try {
        await RSVP.findByIdAndDelete(req.params.id);
        res.json({ message: "RSVP deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
