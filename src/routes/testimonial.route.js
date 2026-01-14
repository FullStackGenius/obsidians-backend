import express from 'express'
import {createTestimonial , getAllTestimonial} from '../controllers/manage/testimonial.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { setUploadSection } from "../middlewares/uploadSection.js";

const testimonialRoutes = express.Router();


testimonialRoutes.post('/create',authMiddleware, setUploadSection("testimonial"), upload.fields([
    { name: "placeholderImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),createTestimonial);
 testimonialRoutes.get('/all-testimonials',authMiddleware,getAllTestimonial);

export default testimonialRoutes;