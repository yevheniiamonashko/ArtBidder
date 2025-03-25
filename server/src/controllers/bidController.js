
import jwt from 'jsonwebtoken';
import { loadBidData, saveBidData } from '../data/bidData.js';
import { getPaintingByIdForBid, updatePaintingBid } from './paintingController.js';
import secret from "../data/secret.js";

let bidList = loadBidData();


export const getAllBids = () => bidList;


export const createBid = (req, res) => {
    try {
        // Validate token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Decode token and extract user ID
        const decoded = jwt.verify(token, secret);
        const userID = decoded.userID;

        // Extract request body parameters
        const { paintingID, amount, date } = req.body;
        if (!paintingID || !amount || !date) {
            return res.status(400).json({ error: 'Painting ID, bid amount, and date are required' });
        }

        // Fetch painting and validate its existence
        const painting = getPaintingByIdForBid(paintingID);

        // Validate bid constraints
        validateBidConstraints(painting, amount);

        // Create and save the new bid
        const newBid = saveNewBid(userID, paintingID, amount, date);

        // Update the painting's current bid
        updatePaintingBid(paintingID, parseFloat(amount));

        // Return success response
        return res.status(201).json({ message: 'Bid created successfully', bid: newBid });
    } catch (error) {
        // Handle errors centrally
        return res.status(400).json({ error: error.message });
    }
};

const validateBidConstraints = (painting, amount) => {
    const currentDate = new Date();
    const startDate = new Date(painting.startDate);
    const endDate = new Date(painting.endDate);

    if (currentDate < startDate) {
        throw new Error('Auction has not started yet');
    }

    if (currentDate > endDate) {
        throw new Error('Auction has ended');
    }

    if (amount <= painting.startPrice) {
        throw new Error('Bid amount must be higher than the start price');
    }

    if (amount <= painting.currentBid) {
        throw new Error('Bid amount must be higher than the current bid');
    }
};

const saveNewBid = (userID, paintingID, amount, date) => {
    const newBid = {
        bidID: bidList.length + 1,
        userID: userID,
        paintingID: parseInt(paintingID, 10),
        amount: parseFloat(amount),
        bidDate: date,
    };

    // Push the new bid to the list
    bidList.push(newBid);

    // Persist updated bid list
    saveBidData(bidList);

    return newBid;
};



