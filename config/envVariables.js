import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_READ_ACCESS_TOKEN: process.env.TMDB_API_READ_ACCESS_TOKEN,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
