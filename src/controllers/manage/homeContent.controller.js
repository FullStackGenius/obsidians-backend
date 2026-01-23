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
    const content = await HomeContent.findOne({ status: true });
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
    console.log(req.body)
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
    console.log(data)
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
