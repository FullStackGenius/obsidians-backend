import { successResponse, errorResponse } from "../../utils/response.js";
import User from "../../models/user.model.js";
import { deleteFileIfExists } from "../../utils/deleteFile.js";
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


export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // ✅ true only in production with HTTPS
      path: "/",     // ✅ IMPORTANT
    })

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    })
  }
}




export const updateProfile = async (req, res) => {
  try {
    // 🔹 FormData se text fields
    const { firstName, lastName, email } = req.body;

    // 🔹 Validation
    if (!firstName || !lastName) {
      return errorResponse(res, {
        statusCode: 400,
        message: "First name and last name are required",
      });
    }

    // 🔹 Existing user fetch (old image ke liye)
    const existingUser = await User.findById(req.user._id);

    if (!existingUser) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    // 🔹 Update object
    const updateData = {
      firstName,
      lastName,
    };

    if (email) {
      updateData.email = email;
    }

    // 🔹 Agar NEW image aayi hai
    if (req.file) {
      // 🗑️ OLD image delete
      if (existingUser.profileImage) {
        deleteFileIfExists(
          `public/uploads/profile/${existingUser.profileImage}`
        );
      }

      // ✅ NEW image save
      updateData.profileImage = req.file.filename;
    }

    // 🔹 MongoDB update
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    return successResponse(res, {
      statusCode: 200,
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};