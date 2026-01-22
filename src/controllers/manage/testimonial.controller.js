import Testimonial from "../../models/Testimonial.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import fs from "node:fs/promises"; // modern promise-based version (recommended)
import path from "node:path";

export const createTestimonial = async (req, res) => {
  try {
    const {
      clinetName,
      description,
      desination
    } = req.body;

    const placeholderImage = req.files?.placeholderImage?.[0];
    const videoFile = req.files?.videoFile?.[0];

    const testimonial = await Testimonial.create({
      placeHolderImage: placeholderImage?.filename || null,
      videourl: videoFile?.filename || null,
      clientName: clinetName,
      description: description,
      desination: desination,
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

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the document (returns the deleted doc)
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Company logo not found",
      });
    }

    // 1. Delete the physical file if path exists in the document
    if (deletedTestimonial.placeHolderImage) {
      // Adjust field name according to your actual schema
      const filename = deletedTestimonial.placeHolderImage;

      // Build full server path
      // Method A: Recommended - use path.join with proper base
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "testimonial"
      );
      const filePath = path.join(uploadDir, filename);

      // Method B: Alternative (if you store full relative path like "uploads/companylogo/abc.jpg")
      // const filePath = path.join(process.cwd(), 'public', deletedLogo.path);

      try {
        await fs.unlink(filePath);
        console.log(`File deleted from disk: ${filePath}`);
      } catch (fsErr) {
        // Important: don't fail the whole request if file is already missing
        if (fsErr.code === "ENOENT") {
          console.warn(
            `File not found on disk (already deleted?): ${filePath}`
          );
        } else {
          console.error(`Error deleting file: ${filePath}`, fsErr);
          // You can still continue (non-critical error)
        }
      }
    }

    if (deletedTestimonial.videourl) {
      // Adjust field name according to your actual schema
      const filename = deletedTestimonial.videourl;

      // Build full server path
      // Method A: Recommended - use path.join with proper base
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "testimonial"
      );
      const filePath = path.join(uploadDir, filename);

      // Method B: Alternative (if you store full relative path like "uploads/companylogo/abc.jpg")
      // const filePath = path.join(process.cwd(), 'public', deletedLogo.path);

      try {
        await fs.unlink(filePath);
        console.log(`File deleted from disk: ${filePath}`);
      } catch (fsErr) {
        // Important: don't fail the whole request if file is already missing
        if (fsErr.code === "ENOENT") {
          console.warn(
            `File not found on disk (already deleted?): ${filePath}`
          );
        } else {
          console.error(`Error deleting file: ${filePath}`, fsErr);
          // You can still continue (non-critical error)
        }
      }
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Company logo and file deleted successfully",
      data: { deletedTestimonial },
    });
  } catch (error) {
    console.error("Delete logo error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: error.message || "Server error while deleting logo",
    });
  }
};

export const editTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    return successResponse(res, {
      statusCode: 201,
      message: "Testimonial  fetch successfully",
      data: { testimonial: testimonial },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};


// export const updateTestimonial = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       clinetName,
//       description,
//       desination
//     } = req.body;

//     const placeholderImage = req.files?.placeholderImage?.[0];
//     const videoFile = req.files?.videoFile?.[0];

//     // 🔍 Find existing testimonial
//     const testimonial = await Testimonial.findById(id);

//     if (!testimonial) {
//       return errorResponse(res, {
//         statusCode: 404,
//         message: "Testimonial not found",
//       });
//     }

//     // 📝 Update fields (only if provided)
//     testimonial.clientName = clinetName ?? testimonial.clientName;
//     testimonial.description = description ?? testimonial.description;
//     testimonial.desination = desination ?? testimonial.desination;

//     if (placeholderImage) {
//       testimonial.placeHolderImage = placeholderImage.filename;
//     }

//     if (videoFile) {
//       testimonial.videourl = videoFile.filename;
//     }

//     await testimonial.save();

//     return successResponse(res, {
//       statusCode: 200,
//       message: "Testimonial updated successfully",
//       data: testimonial,
//     });
//   } catch (error) {
//     return errorResponse(res, {
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// };

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, description, desination } = req.body;

    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Testimonial ID is required",
      });
    }

    const placeholderImage = req.files?.placeholderImage?.[0];
    const videoFile = req.files?.videoFile?.[0];

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Testimonial not found",
      });
    }

    testimonial.clientName = clientName ?? testimonial.clientName;
    testimonial.description = description ?? testimonial.description;
    testimonial.desination = desination ?? testimonial.desination;

    if (placeholderImage) {
      testimonial.placeHolderImage = placeholderImage.filename;
    }

    if (videoFile) {
      testimonial.videourl = videoFile.filename;
    }

    await testimonial.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
