import express from 'express';
import * as userController from '../controllers/userController.js';
import {isLoggedIn} from "../middleware/isLoggedIn.js";



const router = express.Router();


router.get('/:id',isLoggedIn, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id/email', isLoggedIn, userController.editUserByEmail);
router.delete('/:id', isLoggedIn, userController.deleteUserById);
router.get('/:id/winBids', isLoggedIn,  userController.getWonBidsForUser)




export default router;