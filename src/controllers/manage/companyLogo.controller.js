import CompanyLogoModel from "../../models/CompanyLogo.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";

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


