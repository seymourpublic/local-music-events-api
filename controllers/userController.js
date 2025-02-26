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

// Follow a user without authentication
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
        await user.save();

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