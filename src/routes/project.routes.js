import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { createProject ,getAllProjects } from "../controllers/project/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
import { setUploadSection } from "../middlewares/uploadSection.js";
// 🔥 IMPORTANT: upload.any() (dynamic fields)
// router.post("/create",upload.any(), createProject);
router.post(
  "/create",
  authMiddleware,
  setUploadSection("project"),
  upload.any(),
//   upload.fields([
//     { name: "featuredImage", maxCount: 1 },
//     { name: "projectInfoImage", maxCount: 1 },
//     { name: "projectSolutionImage", maxCount: 1 },
//     { name: "clientImage", maxCount: 1 },
//     // { name: "reviewImages", maxCount: 5 },
//   ]),
  createProject
);

router.get(
  "/get-projects",
  authMiddleware,
  getAllProjects
);

export default router;
