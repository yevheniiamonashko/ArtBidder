import express from 'express';
import * as paintingController from '../controllers/paintingController.js';
import {isAdmin} from "../middleware/isAdmin.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";


const router = express.Router();

router.get('/', paintingController.getAllPaintings);
router.get('/:id', paintingController.getPaintingById);
router.post('/', isLoggedIn,    isAdmin, paintingController.createPainting);
router.put('/:id',isLoggedIn, isAdmin, paintingController.updatePainting);
router.delete('/:id', isLoggedIn, isAdmin, paintingController.deletePainting);
router.get('/:id/bids', paintingController.getAllBidsPerPainting);




export default router;
