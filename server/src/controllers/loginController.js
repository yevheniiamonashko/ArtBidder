import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userList } from "../data/userData.js";
import secret from "../data/secret.js";



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the user exists
    const user = userList.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a token for the user
    const token = jwt.sign({ userID: user.userID, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });

    // Return the token and user information
    return res.status(200).json({
        token,
        user: {
            id: user.userID,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
};
