import mongoose from "mongoose";
import config from "../config/config.js"

const dbURL = config.dbURI;
const mongooseOptions = config.mongooseOptions;


export const connectToDatabase = () => {
    mongoose.connect(dbURL, mongooseOptions);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
}