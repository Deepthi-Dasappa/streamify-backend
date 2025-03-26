import { fetchFromTMDB } from "../services/tmdbService.js";

export async function getTrendingTVShow(req, res) {
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
    );
    const randomTVShow =
      responseData.results[
        Math.floor(Math.random() * responseData.results?.length)
      ];
    res.status(200).json({
      success: true,
      content: randomTVShow,
    });
  } catch (error) {
    console.log(`Error in getTrendingTVShow controller : ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getTVShowTrailers(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: responseData.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getTVShowDetails(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, details: responseData });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarTVShows(req, res) {
  const { id } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: responseData.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server eroor" });
  }
}

export async function getTVShowsByCategory(req, res) {
  const { category } = req.params;
  try {
    const responseData = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: responseData.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
}
