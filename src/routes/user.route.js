import express from 'express'
import {profile , logout ,updateProfile} from '../controllers/user/user.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { setUploadSection } from "../middlewares/uploadSection.js";

const userRoutes = express.Router();


userRoutes.get('/profile',authMiddleware,profile);


userRoutes.get('/logout',authMiddleware,logout);
userRoutes.post('/update-profile',authMiddleware, setUploadSection("profile"),upload.single("profileImage"),updateProfile);


export default userRoutes;