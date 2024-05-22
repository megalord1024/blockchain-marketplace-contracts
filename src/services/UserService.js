const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User.js");

const saltRounds = 10;
const UserService = {
  createUser: async (username, password) => {
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return { success: false, message: "Username already exists" };
      }

      // Generate a new UUID for the user
      const uuid = uuidv4();

      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({ uuid, username, password: hashedPassword });
      await user.save();

      return { success: true };
    } catch (error) {
      const message = `An error occurred: ${error.message}`;
      return {
        success: false,
        message: message,
      };
    }
  },

  loginUser: async(username, password) => {
    try {
      // Find the user in the database based on the provided username
      const user = await User.findOne({ username });
      if (!user) {
        return { success: false, message: "Invalid username or password" };
      }

      // Compare the provided password with the stored password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { success: false, message: "Invalid username or password" };
      }

      // JWT Implementation...
      
      // Password matches, login successful
      return { success: true, message: "Login successful", userUuid: user.uuid };
    } catch (error) {
      // Handle any errors that occur during the login process
      return { success: false, message: "Failed to login" };
    }
  }
};

module.exports =  UserService;
