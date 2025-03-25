import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname,'../data/JSONfiles/bidData.json');


export const loadBidData = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {

        return [];
    }
};


export const saveBidData = (bidList) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(bidList, null, 2)); // Format JSON with 2 spaces
    } catch (error) {
        throw error;
    }
};


export const bidList = loadBidData();