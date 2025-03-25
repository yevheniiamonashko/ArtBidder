import express from 'express';
import * as  loginController from "../controllers/loginController.js";

const router = express.Router();

router.post("/", loginController.loginUser); // POST /tokens
export default router;
