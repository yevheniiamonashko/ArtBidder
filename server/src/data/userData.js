import fs from 'fs';
import path from 'path';


const filePath = path.resolve('src/data/JSONfiles/userData.json');


export const loadUserData = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {

        return [];
    }
};


export const saveUserData = (userList) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(userList, null, 2)); // Format JSON with 2 spaces
    } catch (error) {
       throw error;
    }
};


export const userList = loadUserData();