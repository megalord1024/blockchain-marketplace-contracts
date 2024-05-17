import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

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
};

export default UserService;
