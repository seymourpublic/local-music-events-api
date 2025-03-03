const axios = require('axios'); // To send images to Firedrop
const FormData = require('form-data');
const fs = require('fs');
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Follow a user and send a real-time notification
exports.followUser = async (req, res) => {
    try {
        const { userId, followerId } = req.body;

        if (!userId || !followerId) {
            return res.status(400).json({ message: "User ID and Follower ID are required" });
        }

        const user = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!user || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.following.includes(followerId)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        user.following.push(followerId);

        // Create notification
        const notification = {
            user: userId,
            sender: followerId,
            type: 'follow',
            message: `${follower.name} started following you!`,
            read: false
        };

        user.notifications.push(notification);
        await user.save();

        // Emit real-time notification to the followed user
        io.to(userId.toString()).emit('notification', notification);

        res.json({ message: "Followed successfully", following: user.following });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user profile (public)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following', 'name profile_picture role');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('following', 'name profile_picture role');

        if (!user) return res.status(404).json({ message: "User not found" });

        const rsvps = await RSVP.find({ user_id: userId }).populate('event_id', 'name date_time venue_id');

        res.json({ user, rsvps });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('notifications').populate('notifications.sender', 'name profile_picture');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Uploads image to Firedrop API
 */
const uploadToFiredrop = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        const response = await axios.post('https://firedrop-api.onrender.com/upload', formData, {
            headers: { ...formData.getHeaders() }
        });

        return response.data.url; // Assuming Firedrop returns an image URL
    } catch (error) {
        throw new Error('Image upload failed');
    }
};

/**
 * Register User with Image Upload to Firedrop
 */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, bio } = req.body;
        let profilePictureUrl = null;

        if (req.file) {
            profilePictureUrl = await uploadToFiredrop(req.file.path);
        }

        const user = new User({
            name,
            email,
            password, // Ensure hashing before saving
            role,
            bio,
            profile_picture: profilePictureUrl
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Update User Profile with Image Upload to Firedrop
 */
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, bio, social_links } = req.body;
        let profilePictureUrl = null;

        if (req.file) {
            profilePictureUrl = await uploadToFiredrop(req.file.path);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, bio, social_links, profile_picture: profilePictureUrl },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};