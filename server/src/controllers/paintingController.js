import {loadPaintingData, savePaintingData} from '../data/paintingData.js';
import {getArtistByIdForFiltering} from './artistController.js';
import {bidList} from "../data/bidData.js";
import {getUserById} from "./userController.js";
import {getAllBids} from "./bidController.js";


let paintingList = loadPaintingData();

export const getPaintingsList = () => paintingList;

// Declare a combined function for both fetching and filtering paintings
export const getAllPaintings = (req, res) => {
    const {title, artist, style, material} = req.query;


    // Get the filtered paintings using the helper function
    const filteredPaintings = filterPaintings({title, artist, style, material});


    // Return the filtered paintings
    return res.status(200).json({paintings: filteredPaintings});


};


const filterPaintings = ({title, artist, style, material}) => {
    let filteredPaintings = paintingList;

    // Apply filtering based on query parameters
    if (title) {
        filteredPaintings = filteredPaintings.filter(painting =>
            painting.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (artist) {
        filteredPaintings = filteredPaintings.filter(painting => {
            const artistData = getArtistByIdForFiltering(painting.artistID);
            if (artistData) {
                // Combine first and last name and match with the provided artist string
                const fullName = `${artistData.firstname} ${artistData.lastname}`.toLowerCase();
                return fullName.includes(artist.toLowerCase());
            }
        });
    }

    if (style) {
        filteredPaintings = filteredPaintings.filter(painting =>
            painting.style.toLowerCase().includes(style.toLowerCase())
        );
    }

    if (material) {
        filteredPaintings = filteredPaintings.filter(painting =>
            painting.material.toLowerCase().includes(material.toLowerCase())
        );
    }

    return filteredPaintings; // Return the filtered paintings
};


export const getPaintingById = (req, res) => {
    const {id} = req.params;

    updateAuctionWinners();
    const paintingList = loadPaintingData();

    // Convert `id` to a number and find the painting
    const paintingID = parseInt(id, 10);
    const painting = paintingList.find(p => p.paintingID === paintingID);

    if (!painting) {
        return res.status(404).json({message: "Painting not found"});
    }

    return res.status(200).json(painting);
};


export const createPainting = (req, res) => {
    const {title, artistID, yearOfCreation, style, material, startPrice, startDate, endDate, size} = req.body;

    const DEFAULT_IMAGE_URL = "/images/default-img.jpg";

    // Validate required fields
    if (!title || !artistID || !yearOfCreation || !style || !material || !startPrice || !startDate || !endDate) {
        return res.status(400).json({message: "All fields are required"});
    }

    // Validate date range
    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({message: "End date must be after start date"});
    }

    // Validate starting price
    if (parseFloat(startPrice) <= 0) {
        return res.status(400).json({message: "Start price must be greater than zero"});
    }

    const newPaintingID = paintingList.length > 0 ? Math.max(...paintingList.map(p => p.paintingID)) + 1 : 1;

    const newPainting = {
        paintingID: newPaintingID,
        title,
        artistID: parseInt(artistID),
        yearOfCreation: parseInt(yearOfCreation),
        style,
        material,
        size: size || '',
        startPrice: parseFloat(startPrice),
        startDate,
        endDate,
        imageURL: DEFAULT_IMAGE_URL, // Use default image
        winner: '',
        currentBid: 0,
    };

    paintingList.push(newPainting);

    savePaintingData(paintingList);

    res.status(201).json({message: "Painting added successfully!", painting: newPainting});
};

export const updatePainting = (req, res) => {

    const {id} = req.params;
    const {title, artistID, yearOfCreation, style, material, startPrice, startDate, endDate, size} = req.body;

    // Validate ID
    const paintingID = parseInt(id);
    const paintingIndex = paintingList.findIndex(p => p.paintingID === paintingID);

    if (paintingIndex === -1) {
        return res.status(404).json({message: "Painting not found"});
    }

    // Validate date range if provided
    if (endDate && startDate && new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({message: "End date must be after start date"});
    }

    // Validate starting price
    if (startPrice && parseFloat(startPrice) <= 0) {
        return res.status(400).json({message: "Start price must be greater than zero"});
    }

    // Update the painting object
    const updatedPainting = {
        ...paintingList[paintingIndex],
        title: title || paintingList[paintingIndex].title,
        artistID: artistID ? parseInt(artistID) : paintingList[paintingIndex].artistID,
        yearOfCreation: yearOfCreation ? parseInt(yearOfCreation) : paintingList[paintingIndex].yearOfCreation,
        style: style || paintingList[paintingIndex].style,
        material: material || paintingList[paintingIndex].material,
        startPrice: startPrice ? parseFloat(startPrice) : paintingList[paintingIndex].startPrice,
        startDate: startDate || paintingList[paintingIndex].startDate,
        endDate: endDate || paintingList[paintingIndex].endDate,
        size: size || paintingList[paintingIndex].size,
    };

    paintingList[paintingIndex] = updatedPainting;


    savePaintingData(paintingList);

    res.status(200).json({message: "Painting updated successfully", painting: updatedPainting});

};


export const deletePainting = (req, res) => {
    const {id} = req.params;

    // Validate ID
    const paintingID = parseInt(id);
    const paintingIndex = paintingList.findIndex(p => p.paintingID === paintingID);

    if (paintingIndex === -1) {
        return res.status(404).json({message: "Painting not found"});
    }


    // Remove the painting from the list
    paintingList.splice(paintingIndex, 1);

    // Save the updated painting list to the JSON file
    savePaintingData(paintingList);

    res.status(200).json({message: "Painting deleted successfully"});

};


export const getAllBidsPerPainting = (req, res) => {

    let bidList = getAllBids()
    // Extract paintingID from the request parameters
    const {id} = req.params;
    const paintingID = parseInt(id);

    if (!paintingID) {
        return res.status(400).json({error: 'Painting ID is required'});
    }

    // Validate if the painting exists
    const painting = paintingList.find(p => p.paintingID === paintingID);
    if (!painting) {
        return res.status(404).json({error: 'Painting not found'});
    }


    const bidsForPainting = bidList.filter(bid => bid.paintingID === paintingID);

    // Return the bids
    return res.status(200).json({bids: bidsForPainting});

};



const updateAuctionWinners = () => {
    const now = new Date();

    paintingList.forEach(painting => {

        if (new Date(painting.endDate) < now && !painting.winner) {

            const bidsForPainting = bidList.filter(bid => bid.paintingID === painting.paintingID);

            if (bidsForPainting.length > 0) {
                // Determine the highest bid
                const highestBid = bidsForPainting.reduce((maxBid, currentBid) =>
                    currentBid.amount > maxBid.amount ? currentBid : maxBid
                );


                const winningUser = getUserById(highestBid.userID);
                if (winningUser) {
                    painting.winner = highestBid.userID.toString();
                }
            }
        }
    });

    // Save the updated painting data
    savePaintingData(paintingList);
};

export const getPaintingByIdForBid = (paintingID) => {
    const painting = paintingList.find(p => p.paintingID === parseInt(paintingID, 10));
    if (!painting) {
        throw new Error(`Painting with ID ${paintingID} not found`);
    }
    return painting;
};

// Utility: Update a painting
export const updatePaintingBid = (paintingID, newBid) => {

    // Update painting's current bid
    const painting = getPaintingByIdForBid(paintingID); // This will throw an error if not found

    // Update painting's current bid
    painting.currentBid = newBid;

    // Save updated painting data
    savePaintingData(paintingList);

};

