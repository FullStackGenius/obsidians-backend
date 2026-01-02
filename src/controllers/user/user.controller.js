import { successResponse, errorResponse } from "../../utils/response.js";

export const profile = async (req, res) => {
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Profile fetched successfully",
      data: {user : req.user },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};
