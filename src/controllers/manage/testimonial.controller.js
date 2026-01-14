import Testimonial from "../../models/Testimonial.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import fs from 'node:fs/promises';           // modern promise-based version (recommended)
import path from 'node:path';

export const createTestimonial = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    const placeholderImage = req.files?.placeholderImage?.[0];
    const videoFile = req.files?.videoFile?.[0];

    const testimonial = await Testimonial.create({
      placeHolderImage: placeholderImage?.filename || null,
      videourl: videoFile?.filename || null,
      clientName: "AFSFsf",
      description: "AFSFsf",
      desination: "AFSFsf",
      status: true,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};


export const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    return successResponse(res, {
      statusCode: 201,
      message: "Testimonials  fetch successfully",
      data: { testimonials: testimonials },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

// export const deleteCompanyLogo = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find and delete the document (returns the deleted doc)
//     const deletedLogo = await CompanyLogoModel.findByIdAndDelete(id);

//     if (!deletedLogo) {
//       return errorResponse(res, {
//         statusCode: 404,
//         message: "Company logo not found",
//       });
//     }

//     // 1. Delete the physical file if path exists in the document
//     if (deletedLogo.companyLogoImage ) {
//       // Adjust field name according to your actual schema
//       const filename = deletedLogo.companyLogoImage;

//       // Build full server path
//       // Method A: Recommended - use path.join with proper base
//       const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'companylogo');
//       const filePath = path.join(uploadDir, filename);

//       // Method B: Alternative (if you store full relative path like "uploads/companylogo/abc.jpg")
//       // const filePath = path.join(process.cwd(), 'public', deletedLogo.path);

//       try {
//         await fs.unlink(filePath);
//         console.log(`File deleted from disk: ${filePath}`);
//       } catch (fsErr) {
//         // Important: don't fail the whole request if file is already missing
//         if (fsErr.code === 'ENOENT') {
//           console.warn(`File not found on disk (already deleted?): ${filePath}`);
//         } else {
//           console.error(`Error deleting file: ${filePath}`, fsErr);
//           // You can still continue (non-critical error)
//         }
//       }
//     }

//     return successResponse(res, {
//       statusCode: 200,
//       message: "Company logo and file deleted successfully",
//       data: { deletedLogo },
//     });
//   } catch (error) {
//     console.error("Delete logo error:", error);
//     return errorResponse(res, {
//       statusCode: 500,
//       message: error.message || "Server error while deleting logo",
//     });
//   }
// };