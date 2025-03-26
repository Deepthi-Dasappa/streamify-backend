import { fetchFromTMDB } from "../services/tmdbService.js";

export async function getTrendingMovie(req, res) {
  try {
    const responseData = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      responseData.results[
        Math.floor(Math.random() * responseData.results?.length)
      ];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log(`Error in getTrendingMovie controller : ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: responseData.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getMovieTrailers controller : ${error.message}`);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, details: responseData });
  } catch (error) {
    if (error.message.includes(404)) {
      res.send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({ success: true, similar: responseData.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: responseData.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
}
