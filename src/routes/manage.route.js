import express from 'express'
import {createCompanyLogo,getCompanyLogo} from '../controllers/manage/companyLogo.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { setUploadSection } from "../middlewares/uploadSection.js";

const mangeRoutes = express.Router();



mangeRoutes.post('/create',authMiddleware, setUploadSection("companylogo"),upload.single("companylogo"),createCompanyLogo);
mangeRoutes.get('/all-logos',authMiddleware,getCompanyLogo);

export default mangeRoutes;