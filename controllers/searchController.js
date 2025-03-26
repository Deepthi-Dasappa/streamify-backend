import { UserModel } from "../models/userModel.js";
import { fetchFromTMDB } from "../services/tmdbService.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (responseData.results.length === 0) {
      return res.status(404).send(null);
    }

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responseData.results[0].id,
          title: responseData.results[0].name,
          image: responseData.results[0].profile_path,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: responseData.results });
  } catch (error) {
    console.log("Error in searchPerson controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (responseData.results.length === 0) {
      res.status(404).send(null);
    }

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responseData.results[0].id,
          title: responseData.results[0].title,
          image: responseData.results[0].poster_path,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ status: 200, content: responseData.results });
  } catch (error) {
    console.log("Error in searchMovie Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchTVShow = async (req, res) => {
  const { query } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (responseData.results.length === 0) {
      res.status(404).send(null);
    }

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responseData.results[0].id,
          title: responseData.results[0].name,
          image: responseData.results[0].poster_path,
          searchType: "tv-show",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: responseData.results });
  } catch (error) {
    console.log("Error in searchTVShow controller :", error.mesage);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    const userIdPresent = await UserModel.findById(req.user._id);
    console.log("userIdPresent :", userIdPresent);
    if (!userIdPresent) {
      res.status(404).json({ success: false, message: "Id not present" });
    }
    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: ",
      error.message
    );

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
