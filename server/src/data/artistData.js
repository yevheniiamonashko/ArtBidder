import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname,'../data/JSONfiles/artistData.json');



export const loadArtistData = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {

        return [];
    }
};


export const saveArtistData = (artistList) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(artistList, null, 2)); // Format JSON with 2 spaces
    } catch (error) {
        throw error;
    }
};

// Initialize authorList from JSON file
export const artistList = loadArtistData();