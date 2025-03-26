import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVariables.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-streamify", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in milliseconds
    httpOnly: true, //prevents XSS(cross-site Scripting attacks, make it not be accessed by Javascript)
    sameSite: "strict", //prevents CSRF(cross-site request forgery) attacks
    secure: ENV_VARS.NODE_ENV !== "development",
  });

  return token;
};
