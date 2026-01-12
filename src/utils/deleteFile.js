import fs from "fs";
import path from "path";

export const deleteFileIfExists = (relativePath) => {
  if (!relativePath) return;

  const fullPath = path.join(process.cwd(), relativePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};
