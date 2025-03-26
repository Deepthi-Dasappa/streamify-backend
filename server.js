import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import movieRouter from "./routes/movieRouter.js";
import tvShowRouter from "./routes/tvShowRouter.js";
import searchRouter from "./routes/searchRouter.js";

import { protectRoute } from "./middleware/protectRoute.js";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVariables.js";

const app = express();
const port = ENV_VARS.PORT;

app.use(express.json()); //will allow us to parse the request body
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv-show", protectRoute, tvShowRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

app.listen(port, () => {
  console.log(`Backend server started at http://localhost:${port}`);
  connectDB();
});
