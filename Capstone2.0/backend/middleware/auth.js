// middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId; 
        next();
    });
};

module.exports = authenticate;
