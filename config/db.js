import mongoose from "mongoose";
import { ENV_VARS } from "./envVariables.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log(`MongoDB connected : ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB : ${error.message}`);
    process.exit(1);//1 means error, 0 means success
  }
};
