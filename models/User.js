const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Receiver
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Follower
    type: { type: String, enum: ['follow'], required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Hashed password for authentication
    role: { type: String, enum: ['artist', 'organizer', 'attendee'], required: true },
    bio: { type: String },
    profile_picture: { type: String }, // Link retrieved from the Firedrop API
    social_links: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        website: { type: String }
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users they follow
    refreshToken: { type: String },  // Stores the latest refresh token for session persistence
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
