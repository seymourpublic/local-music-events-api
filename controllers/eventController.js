const Event = require('../models/Event');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('venue_id', 'name location capacity') // Populate venue details
            .populate('genre_id', 'name') // Populate genre name
            .populate('created_by', 'name email profile_picture') // Populate creator details
            .select('-__v'); // Exclude version key
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
            console.log("File received for upload:", req.file);
            eventImageUrl = await uploadToFiredrop(req.file); // ✅ Pass full file object
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
            console.log("File received for update:", req.file);
            eventImageUrl = await uploadToFiredrop(req.file); // ✅ Pass full file object
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
        console.log("Received file object:", file);

        // Ensure file object is valid
        if (!file || !file.path || !file.originalname) {
            console.error("Invalid file object received:", file);
            throw new Error("Invalid file. Ensure Multer is configured correctly.");
        }

        // Preserve original file extension
        const fileExtension = path.extname(file.originalname) || '.jpg';
        const newFilePath = `${file.path}${fileExtension}`; // Append correct extension

        console.log("Renaming file:", file.path, "to", newFilePath);
        fs.renameSync(file.path, newFilePath); // Rename file to keep extension

        // Prepare FormData
        const formData = new FormData();
        formData.append('file', fs.createReadStream(newFilePath), {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        console.log("Uploading file to Firedrop...");
        const response = await axios.post('https://firedrop-api.onrender.com/upload', formData, {
            headers: { ...formData.getHeaders() }
        });

        console.log("Firedrop Response:", response.data);
        return response.data.url; // Assuming Firedrop API returns an image URL
    } catch (error) {
        console.error("Image Upload Error:", error.response ? error.response.data : error.message);
        throw new Error('Image upload failed');
    }
};
