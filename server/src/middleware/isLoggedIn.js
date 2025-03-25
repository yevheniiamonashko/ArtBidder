import jwt from 'jsonwebtoken';
import secret from '../data/secret.js'; // The shared secret for all users

export const isLoggedIn = (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {

        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        // Verify the token with the shared secret
        req.user = jwt.verify(token, secret);

        // Attach the decoded token data to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {


        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Helper function to extract token from Authorization header
const getTokenFromRequest = (req) => {
    const authHeader = req.headers['authorization'];

    return authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
};
