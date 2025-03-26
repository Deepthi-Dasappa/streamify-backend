import jwt from "jsonwebtoken";

import { ENV_VARS } from "../config/envVariables.js";
import { UserModel } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-streamify"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.group("Error in ProtectRoute middleware: ", error.message);
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
};
