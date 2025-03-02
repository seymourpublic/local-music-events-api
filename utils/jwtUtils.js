const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate Access and Refresh Tokens for a user.
 * @param {Object} user - The user object.
 * @returns {Object} - Returns access and refresh tokens.
 */
exports.generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user._id }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );

    return { accessToken, refreshToken };
};

/**
 * Verify Access Token
 * @param {string} token - The JWT token to verify.
 * @returns {Object|boolean} - Returns decoded token if valid, else false.
 */
exports.verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false;
    }
};

/**
 * Verify Refresh Token
 * @param {string} token - The refresh token to verify.
 * @returns {Object|boolean} - Returns decoded token if valid, else false.
 */
exports.verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return false;
    }
};
