import HomeContent from "../../models/HomeContent.model.js";

import { successResponse, errorResponse } from "../../utils/response.js";
import fs from "node:fs/promises"; // modern promise-based version (recommended)
import path from "node:path";

export const homeBannerContent = async (req, res) => {
  try {
    const exists = await HomeContent.findOne();

    if (!exists) {
      await HomeContent.create({});
      console.log("✅ HomeContent default data created");
    }
    const content = await HomeContent.findOne({ status: true }).lean();
    content.ImageBasePath = `${process.env.BASE_URL}/uploads/home/`;
    // console.log(content)
    return successResponse(res, {
      statusCode: 201,
      message: "Home banner Content fetch successfully",
      data: content,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const updatehomeBannerContent = async (req, res) => {
  try {
    console.log(req.body);
    const content = await HomeContent.findOne({ status: true });

    if (!content) {
      return errorResponse(res, {
        statusCode: 404,
        message: "content not found",
      });
    }

    /* ─────────── IMAGE HANDLING ─────────── */

    let bannerImage = content.heroSection?.bannerImage || "";

    if (req.file) {
      // 🧹 delete old image if exists
      // if (bannerImage) {
      //   const oldImagePath = path.join(
      //     process.cwd(),
      //     "public",
      //     bannerImage
      //   );

      //   if (fs.existsSync(oldImagePath)) {
      //     fs.unlinkSync(oldImagePath);
      //   }
      // }

      // ✅ save new image path
      bannerImage = `/uploads/bannerimage/${req.file.filename}`;
    }

    /* ─────────── DATA OBJECT ─────────── */

    const data = {
      welcomeText: req.body.welcomeText,
      brandName: req.body.brandName,
      mainHeading: req.body.mainHeading,
      highlightedText: req.body.highlightedText,
      description: req.body.description,
      primaryButton: {
        text: req.body.primaryButtonText,
        link: req.body.primaryButtonLink,
      },
      bannerImage: "req.file.filename",
      expertBoxes: [
        {
          title: req.body.title1,
          subtitle: req.body.subtitle1,
          description: req.body.description1,
        },
        {
          title: req.body.title2,
          subtitle: req.body.subtitle2,
          description: req.body.description2,
        },
        {
          title: req.body.title3,
          subtitle: req.body.subtitle3,
          description: req.body.description3,
        },
      ],

      scrollDown: {
        text: req.body.scrollDownText,
        targetId: req.body.scrollDownTargetId,
      },
    };
    console.log(data);
    content.heroSection = data;

    await content.save();
    return successResponse(res, {
      statusCode: 201,
      message: "Home banner Content fetch successfully",
      data: content,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const updateAboutSection = async (req, res) => {
  try {
    const content = await HomeContent.findOne({ status: true });

    if (!content) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Content not found",
      });
    }

    const files = req.files || {};
    const body = req.body;

    /* ───────── IMAGE HELPERS ───────── */
    const getFilePath = (field) =>
      files[field]?.[0] && files[field][0].size > 0
        ? files[field][0].filename
        : null;

    const newReviewImages =
      files.reviewImages
        ?.filter((f) => f.size > 0)
        .map((file) => file.filename) || [];

    const reviewImages = [
      ...(content.aboutSection.reviews.reviewImages || []),
      ...newReviewImages,
    ];

    /* ───────── DATA OBJECT ───────── */
    content.aboutSection = {
      heading: {
        title: body.headingTitle,
        highlightedText: body.headingHighlightedText,
      },

      contentImage:
        getFilePath("contentImage") || content.aboutSection.contentImage,

      description: body.description,

      button: {
        text: body.buttonText,
        link: body.buttonLink,
        icon: getFilePath("buttonIcon") || content.aboutSection.button.icon,
      },

      reviews: {
        rating: body.reviewsRating,
        label: body.reviewsLable,
        platform: body.reviewsPlatform,
        platformIcon:
          getFilePath("platformIcon") ||
          content.aboutSection.reviews.platformIcon,
        reviewImages,
      },

      sideImage: getFilePath("sideImage") || content.aboutSection.sideImage,
    };

    await content.save();

    return successResponse(res, {
      statusCode: 200,
      message: "About section updated successfully",
      data: content.aboutSection,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};


export const deleteReviewImage = async (req, res) => {
  try {
    const { image } = req.body; // filename

    if (!image) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Image name is required",
      });
    }

    const content = await HomeContent.findOne({ status: true });

    if (!content) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Content not found",
      });
    }

    const oldImages = content.aboutSection.reviews.reviewImages || [];

    // 🔹 Check image exists
    if (!oldImages.includes(image)) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Image not found in reviews",
      });
    }

    // 🔹 Remove image from array
    content.aboutSection.reviews.reviewImages = oldImages.filter(
      (img) => img !== image
    );

    // 🔹 OPTIONAL: delete file from server
    const imagePath = path.join(
      process.cwd(),
      "uploads/reviews", // ⚠️ adjust to your folder
      image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await content.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Review image deleted successfully",
      data: content.aboutSection.reviews.reviewImages,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};