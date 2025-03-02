const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateTokens, verifyRefreshToken  } = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');
require('dotenv').config();

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const { accessToken, refreshToken } = generateTokens(user);

        // Store refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Current User (Protected)
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { id: user._id }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const newAccessToken = jwt.sign(
                { id: decoded.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );

            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict' });
    res.json({ message: "Logged out successfully" });
};

