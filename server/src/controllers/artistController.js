import {loadArtistData, saveArtistData} from '../data/artistData.js';

let artistList = loadArtistData();

export const getAllArtists = (req, res) => {
    if (artistList.length === 0) {
        return res.status(200).json([]);
    }
    res.status(200).json(artistList);
};

export const getArtistById = (req, res) => {

    const { id } = req.params;


    const artistID = parseInt(id, 10);
    const artist = artistList.find(a => a.artistID === artistID);

    if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
    }

    return res.status(200).json(artist);

};

export const getArtistByIdForFiltering = (id) => {

    return artistList.find(artist => artist.artistID === id);
};




export const createArtist = (req, res) => {
    const { firstname, lastname, country, style, description } = req.body;

    const DEFAULT_IMAGE_URL = "/images/artists/default-artist.jpg";


    if (!firstname || !lastname || !country || !style || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }


    const newArtistID = artistList.length > 0 ? Math.max(...artistList.map(a => a.artistID)) + 1 : 1;

    // Create a new artist object
    const newArtist = {
        artistID: newArtistID,
        firstname,
        lastname,
        country,
        style,
        description,
        imageURL: DEFAULT_IMAGE_URL,
    };

    // Add the artist to the list
    artistList.push(newArtist);

    // Save the updated artist list to the JSON file
    saveArtistData(artistList);

    res.status(201).json({ message: "Artist added successfully!", artist: newArtist });
};

export const updateArtist = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, country, style, description } = req.body;

    // Validate ID
    const artistID = parseInt(id);
    const artistIndex = artistList.findIndex(a => a.artistID === artistID);

    if (artistIndex === -1) {
        return res.status(404).json({ message: "Artist not found" });
    }

    // Update the artist object
    const updatedArtist = {
        ...artistList[artistIndex],
        firstname: firstname || artistList[artistIndex].firstname,
        lastname: lastname || artistList[artistIndex].lastname,
        country: country || artistList[artistIndex].country,
        style: style || artistList[artistIndex].style,
        description: description || artistList[artistIndex].description,
    };

    artistList[artistIndex] = updatedArtist;

    // Save the updated artist list to the JSON file
    saveArtistData(artistList);

    res.status(200).json({ message: "Artist updated successfully", artist: updatedArtist });
};

export const deleteArtist = (req, res) => {
    const { id } = req.params;

    // Validate ID
    const artistID = parseInt(id);
    const artistIndex = artistList.findIndex(a => a.artistID === artistID);

    if (artistIndex === -1) {
        return res.status(404).json({ message: "Artist not found" });
    }

    // Remove the artist from the list
    artistList.splice(artistIndex, 1);

    // Save the updated artist list to the JSON file
    saveArtistData(artistList);

    res.status(200).json({
        message: "Artist deleted successfully",
    });
};










