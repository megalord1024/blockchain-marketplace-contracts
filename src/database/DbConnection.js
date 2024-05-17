const mongoose = require("mongoose");
const { MONGODB_URI } = require("../../config");

const connectToDatabase = () => {
  mongoose.connect(MONGODB_URI)
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}

module.exports = connectToDatabase;