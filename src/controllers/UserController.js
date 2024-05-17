import UserService from "../services/UserService.js";

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

  // loginUser: async (req, res) => {
  //   try {
  //     const { username, password } = req.body;

  //     // Find the user by username
  //     const user = await User.findOne({ username });
  //     if (!user) {
  //       return res.status(401).json({ error: 'Invalid username or password' });
  //     }

  //     // Compare the password
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ error: 'Invalid username or password' });
  //     }

  //     // Generate a JWT
  //     const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

  //     res.json({ token });
  //   } catch (error) {
  //     res.status(500).json({ error: 'An error occurred while logging in' });
  //   }
  // },
};

export default UserController;
