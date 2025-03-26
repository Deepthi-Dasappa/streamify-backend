import express from "express";

import {
  searchPerson,
  searchMovie,
  searchTVShow,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/person/:query", searchPerson);
searchRouter.get("/movie/:query", searchMovie);
searchRouter.get("/tv-show/:query", searchTVShow);
searchRouter.get("/history", getSearchHistory);
searchRouter.delete("/history/delete/:id", removeItemFromSearchHistory);

export default searchRouter;
