import express from "express";
import {
  homeBannerContent,
  updatehomeBannerContent,
  updateAboutSection,
  deleteReviewImage
} from "../controllers/manage/homeContent.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { setUploadSection } from "../middlewares/uploadSection.js";

const homeContentRoutes = express.Router();

homeContentRoutes.get(
  "/get-home-banner-content",
  authMiddleware,
  homeBannerContent,
);
homeContentRoutes.post(
  "/banner-update",
  authMiddleware,
  setUploadSection("home"),
  upload.single("bannerImage"),
  updatehomeBannerContent,
);

homeContentRoutes.post(
  "/about-update",
  authMiddleware,
  setUploadSection("home"),
  upload.fields([
    { name: "contentImage", maxCount: 1 },
    { name: "sideImage", maxCount: 1 },
    { name: "buttonIcon", maxCount: 1 },
    { name: "platformIcon", maxCount: 1 },
    { name: "reviewImages", maxCount: 5 },
  ]),
  updateAboutSection
);
homeContentRoutes.post("/delete-review-image", deleteReviewImage);
export default homeContentRoutes;
