import express from "express";
import {
  createTestimonial,
  getAllTestimonial,
  deleteTestimonial,
  editTestimonial,
  updateTestimonial
} from "../controllers/manage/testimonial.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { setUploadSection } from "../middlewares/uploadSection.js";

const testimonialRoutes = express.Router();

testimonialRoutes.post(
  "/create",
  authMiddleware,
  setUploadSection("testimonial"),
  upload.fields([
    { name: "placeholderImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  createTestimonial
);
testimonialRoutes.get("/all-testimonials", authMiddleware, getAllTestimonial);
testimonialRoutes.delete("/delete/:id", deleteTestimonial);
testimonialRoutes.get("/edit/:id", editTestimonial);
//testimonialRoutes.get("/update", updateTestimonial);
// testimonialRoutes.post(
//   "/update",
//   authMiddleware,
//   setUploadSection("testimonial"),
//   upload.fields([
//     { name: "placeholderImage", maxCount: 1 },
//     { name: "videoFile", maxCount: 1 },
//   ]),
//   createTestimonial
// );

testimonialRoutes.post(
  "/update/:id",
  authMiddleware,
  setUploadSection("testimonial"),
  upload.fields([
    { name: "placeholderImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  updateTestimonial
);


export default testimonialRoutes;
