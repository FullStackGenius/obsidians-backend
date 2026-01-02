import express from 'express'
import {profile} from '../controllers/user/user.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();


userRoutes.get('/profile',authMiddleware,profile);





export default userRoutes;