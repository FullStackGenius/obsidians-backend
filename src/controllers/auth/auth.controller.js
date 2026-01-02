import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../../utils/response.js";

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return successResponse(res, {
      statusCode: 201,
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName: first_name,
      lastName: last_name,
      profileImage: "qsqhwshqsg",
      email,
      password: hashedPassword,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};
