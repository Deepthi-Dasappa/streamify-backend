import { ENV_VARS } from "../config/envVariables.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ENV_VARS.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch the data from TMDB : ${response.status} `);
  }

  const responseData = await response.json();

  return responseData;
};
