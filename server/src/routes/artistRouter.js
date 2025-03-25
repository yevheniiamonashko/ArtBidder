import express from 'express';
import * as artistController from '../controllers/artistController.js';
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isAdmin} from "../middleware/isAdmin.js";


const router = express.Router();

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/',  isLoggedIn, isAdmin,  artistController.createArtist);
router.put('/:id', isLoggedIn, isAdmin, artistController.updateArtist);
router.delete('/:id', isLoggedIn, isAdmin, artistController.deleteArtist)

export default router;
