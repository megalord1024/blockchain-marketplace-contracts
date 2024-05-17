const jwt = require("jsonwebtoken");

// Secret key used to sign the JWT token
const { JWT_SECRET_KEY } = require("../../config.js");

// Generate a JWT token with a payload
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token verification failed
      }

      req.user = user; // Attach the user object to the request
      next(); // Continue to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // Token not provided
  }
};

module.exports = { generateToken, authenticateToken };
