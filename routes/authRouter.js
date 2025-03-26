import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

authRouter.get("/authCheck", protectRoute, authCheck);

export default authRouter;
