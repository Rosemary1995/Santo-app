const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, "1234567890");
        
        // Add user data to request
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

module.exports = auth;
