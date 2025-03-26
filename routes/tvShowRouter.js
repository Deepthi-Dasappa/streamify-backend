import express from "express";
import {
  getTrendingTVShow,
  getTVShowTrailers,
  getTVShowDetails,
  getSimilarTVShows,
  getTVShowsByCategory,
} from "../controllers/tvShowControllers.js";

const tvShowRouter = express.Router();

tvShowRouter.get("/trending", getTrendingTVShow);
tvShowRouter.get("/:id/trailers", getTVShowTrailers);
tvShowRouter.get("/:id/details", getTVShowDetails);
tvShowRouter.get("/:id/similar", getSimilarTVShows);
tvShowRouter.get("/:category", getTVShowsByCategory);

export default tvShowRouter;
