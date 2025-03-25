import {loadUserData, saveUserData} from "../data/userData.js";
import jwt from "jsonwebtoken";
import secret from "../data/secret.js";
import bcrypt from "bcrypt";
import {getAllBids} from "./bidController.js";
import {getPaintingsList} from "./paintingController.js";

let userList = loadUserData();


function validateEmailAddress(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

export const createUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    if (!validateEmailAddress(email)) {
        return res.status(400).json({message: 'Invalid email address!'});
    }

    if (password.length < 8) {
        return res.status(400).json({message: 'Password must have at least 8 characters'});
    }

    const userExists = userList.find(user => user.email === email);
    if (userExists) {
        return res.status(400).send({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserId = userList.length > 0 ? Math.max(...userList.map(user => user.userID)) + 1 : 1;
    const newUser = {
        userID: newUserId,
        email: email,
        password: hashedPassword,
        isAdmin: false
    }
    // Add the new user to the in-memory user list
    userList.push(newUser);
    // Save the updated user list to the JSON file
    saveUserData(userList);


    const token = jwt.sign({userID: newUser.userID, isAdmin: newUser.isAdmin}, secret, {expiresIn: '1h'});
    res.status(201).json({
        token,
        user: {
            userID: newUser.userID,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        }
    });

};
export const getUserById = (id) => {
    return userList.find(user => user.userID === id);
}

export const editUserByEmail = (req, res) => {
    const {id} = req.params;
    const {newEmail} = req.body;

    const user = userList.find(user => user.userID === parseInt(id));
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    if (!validateEmailAddress(newEmail)) {
        return res.status(400).json({message: 'Invalid new email address!'});
    }

    user.email = newEmail;
    saveUserData(userList);
    res.status(200).json({message: "Email updated successfully", user});
};

export const deleteUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = userList.findIndex(user => user.userID === userId);
    if (userIndex === -1) {
        return res.status(404).json({message: "User not found"});
    }

    userList.splice(userIndex, 1);
    saveUserData(userList);
    res.status(200).json({message: "User deleted successfully"});
};




export const getWonBidsForUser = (req, res) => {
    const bidList = getAllBids(); // Load all bids
    const paintingList = getPaintingsList(); // Load all paintings
    const userId = parseInt(req.params.id);

    // Validate user ID
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Check if the user exists
    const user = userList.find((user) => user.userID === userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // Find paintings where the user is the winner
    const wonPaintings = paintingList.filter(
        (painting) => painting.winner && parseInt(painting.winner) === userId
    );

    if (wonPaintings.length === 0) {
        return res.status(200).json({ bids: [] }); // No won paintings
    }

    // Retrieve the highest bid for the won paintings
    const wonBids = wonPaintings.map((painting) => {
        const winningBid = bidList.find(
            (bid) =>
                bid.paintingID === painting.paintingID &&
                bid.amount === painting.currentBid &&
                bid.userID === userId
        );
        return winningBid; // Return the winning bid for the user
    }).filter(Boolean); // Filter out any undefined results

    return res.status(200).json({ bids: wonBids });
};

