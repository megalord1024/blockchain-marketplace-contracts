const UserService = require("../services/UserService.js");
const { generateToken } = require("../auth/jwt.js")

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const result = await UserService.createUser(username, password);

      if (result.success) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while registering user" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const result = await UserService.loginUser(username, password);

      if (result.success) {
        // Generate JWT token
        const token = generateToken({ username: username, userUuid: result.uuid });
        console.log(token);

        res.status(200).json({ message: "Login successful", token: token });
      } else {
        res.status(401).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  },
};

module.exports = UserController;
