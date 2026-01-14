import CompanyLogoModel from "../../models/CompanyLogo.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import fs from 'node:fs/promises';           // modern promise-based version (recommended)
import path from 'node:path';
export const createCompanyLogo = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Company logo image is required",
      });
    }

    const newLogo = await CompanyLogoModel.create({
      companyLogoImage: req.file.filename,
      status: true, // active by default
    });
    return successResponse(res, {
      statusCode: 201,
      message: "Company logo uploaded successfully",
      data: { logo: newLogo },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getCompanyLogo = async (req, res) => {
  try {
    const newLogo = await CompanyLogoModel.find();
    return successResponse(res, {
      statusCode: 201,
      message: "Company logo fetch successfully",
      data: { logo: newLogo },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const deleteCompanyLogo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the document (returns the deleted doc)
    const deletedLogo = await CompanyLogoModel.findByIdAndDelete(id);

    if (!deletedLogo) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Company logo not found",
      });
    }

    // 1. Delete the physical file if path exists in the document
    if (deletedLogo.companyLogoImage ) {
      // Adjust field name according to your actual schema
      const filename = deletedLogo.companyLogoImage;

      // Build full server path
      // Method A: Recommended - use path.join with proper base
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'companylogo');
      const filePath = path.join(uploadDir, filename);

      // Method B: Alternative (if you store full relative path like "uploads/companylogo/abc.jpg")
      // const filePath = path.join(process.cwd(), 'public', deletedLogo.path);

      try {
        await fs.unlink(filePath);
        console.log(`File deleted from disk: ${filePath}`);
      } catch (fsErr) {
        // Important: don't fail the whole request if file is already missing
        if (fsErr.code === 'ENOENT') {
          console.warn(`File not found on disk (already deleted?): ${filePath}`);
        } else {
          console.error(`Error deleting file: ${filePath}`, fsErr);
          // You can still continue (non-critical error)
        }
      }
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Company logo and file deleted successfully",
      data: { deletedLogo },
    });
  } catch (error) {
    console.error("Delete logo error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: error.message || "Server error while deleting logo",
    });
  }
};