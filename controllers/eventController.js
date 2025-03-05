const Event = require('../models/Event');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('venue_id genre_id created_by');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Create an Event with Image Upload
 */
exports.createEvent = async (req, res) => {
    try {
        const { name, date_time, venue_id, genre_id, ticket_price, rsvp_link, created_by } = req.body;
        let eventImageUrl = null;

        if (req.file) {
            eventImageUrl = await uploadToFiredrop(req.file.path);
        }

        const event = new Event({
            name,
            date_time,
            venue_id,
            genre_id,
            ticket_price,
            rsvp_link,
            created_by,
            image: eventImageUrl
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('venue_id genre_id created_by');
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Update an Event with New Image Upload
 */
exports.updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { name, date_time, ticket_price, rsvp_link } = req.body;
        let eventImageUrl = null;

        if (req.file) {
            eventImageUrl = await uploadToFiredrop(req.file.path);
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { name, date_time, ticket_price, rsvp_link, image: eventImageUrl },
            { new: true }
        );

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Uploads image to Firedrop API
 */
const uploadToFiredrop = async (file) => {
    try {
        const formData = new FormData();
        const fileExtension = path.extname(file.originalname); // Get the original file extension
        const newFilePath = `${file.path}${fileExtension}`; // Append the correct extension

        fs.renameSync(file.path, newFilePath); // Rename the file to include extension

        formData.append('file', fs.createReadStream(newFilePath), {
            filename: file.originalname, // Preserve original filename
            contentType: file.mimetype, // Preserve original MIME type
        });

        const response = await axios.post('https://firedrop-api.onrender.com/upload', formData, {
            headers: { ...formData.getHeaders() }
        });

        return response.data.url; // Assuming Firedrop API returns image URL
    } catch (error) {
        throw new Error('Image upload failed');
    }
};
