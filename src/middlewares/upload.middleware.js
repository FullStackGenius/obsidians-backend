// import multer from "multer";
// import path from "path";
// import fs from "fs/promises"; // ← better to use promises version

// // Folder mapping - clean, extensible
// const FOLDER_MAP = {
//   profile: "public/uploads/profile",
//   blog: "public/uploads/blog",
//   product: "public/uploads/products",
//   banner: "public/uploads/banners",
//   companylogo : "public/uploads/companylogo"
//   // you can easily add more later
//   // document: "public/uploads/documents",
// };

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     // You can decide section from different places (order of priority)
//     const section =
//       req.uploadSection ||           // highest priority - if you set it manually
//       req.body.uploadSection ||      // from form field
//       req.body.type ||               // another common name
//       "profile" || "companylogo";                     // ← most common default in 2026

//     const uploadPath = FOLDER_MAP[section] || "public/uploads/others";

//     // Modern way - async + safe folder creation
//     try {
//       await fs.mkdir(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     } catch (err) {
//       cb(err);
//     }
//   },

//   filename: (req, file, cb) => {
//     // More readable + safer extension handling
//     const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

//     cb(null, unique);
//   },
// });

// const upload = multer({
//   storage,

//   // Reasonable limits in 2026 (most apps allow 5–10 MB for images)
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB - most common choice nowadays
//   },

//   fileFilter: (req, file, cb) => {
//     // If no file was sent → allow (very important for optional images)
//     if (!file || !file.originalname) {
//       return cb(null, true);
//     }

//     const allowedTypes = /jpeg|jpg|png|webp|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     }

//     // Instead of throwing → silently reject invalid file
//     // (you can still log it or handle later in controller)
//     cb(null, false);
//   },
// });

// // Optional: export different variants for more clarity & reusability
// export const uploadSingle = (fieldName = "image") => upload.single(fieldName);
// export const uploadMultiple = (fieldName = "images", max = 10) =>
//   upload.array(fieldName, max);

// // Default export remains the same
// export default upload;


import multer from "multer";
import path from "path";
import fs from "fs/promises";

const FOLDER_MAP = {
  placeholderImage: "public/uploads/testimonial",
  videoFile: "public/uploads/testimonial",
  companylogo: "public/uploads/companylogo",
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // 🔥 Folder decide by FIELD NAME (BEST)
      const uploadPath =
        FOLDER_MAP[file.fieldname] || "public/uploads/others";

      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    if (!file) return cb(null, true);

    // image + video support
    const allowed = /jpeg|jpg|png|webp|gif|mp4|mov|webm/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) return cb(null, true);
    cb(null, false);
  },
});

export default upload;
