import express from 'express';
import * as bidController from '../controllers/bidController.js';
import {isLoggedIn} from "../middleware/isLoggedIn.js";



const router = express.Router();


router.post('/', isLoggedIn, bidController.createBid);

export default router;


