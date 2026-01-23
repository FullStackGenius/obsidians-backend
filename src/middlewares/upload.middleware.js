import multer from "multer";
import path from "path";
import fs from "fs/promises";

const FOLDER_MAP = {
  placeholderImage: "public/uploads/testimonial",
  videoFile: "public/uploads/testimonial",
  companylogo: "public/uploads/companylogo",
  bannerImage: "public/uploads/bannerimage",
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
