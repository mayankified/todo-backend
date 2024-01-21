// auth.js
import Jwt from "jsonwebtoken";
import { User } from "../Model/users.js";

export const auth = async (req, res, next) => {
  try {
    // Get the token from either the Authorization header or the cookie
    const token = req.headers.authorization || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing token",
      });
    }

    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken._id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
