import  fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to the equivalent of `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//path tho the JSON file
const filePath = path.resolve(__dirname, '../data/JSONfiles/paintingData.json');

export const loadPaintingData = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {

        return [];
    }
};


export const savePaintingData = (paintingList) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(paintingList, null, 2));

    } catch (error) {

       throw error;
    }
};



// Initialize paintingList from JSON file

export const paintingList = loadPaintingData();


