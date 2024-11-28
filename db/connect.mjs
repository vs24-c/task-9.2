import mongoose from "mongoose";
import config from "../config/default.mjs";

// Connect to MongoDB
mongoose.Promise = global.Promise

export default async function () { 
  try {
    await mongoose.connect(config.mongoURI, {})
    console.log('Successfully connected to MongoDB');    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}