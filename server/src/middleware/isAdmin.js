import { isLoggedIn } from './isLoggedIn.js'; // Reuse the isLoggedIn middleware

export const isAdmin = (req, res, next) => {

    isLoggedIn(req, res, () => {
        // After verifying the user, check if they have admin rights
        if (req.user && req.user.isAdmin) {
            next(); // User is admin, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Admin privileges are required' });
        }
    });
};