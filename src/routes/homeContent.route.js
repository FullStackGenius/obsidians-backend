import express from "express";
import {
  homeBannerContent,
  updatehomeBannerContent,
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
  setUploadSection("bannerimage"),
  upload.single("bannerImage"),
  updatehomeBannerContent,
);
export default homeContentRoutes;
