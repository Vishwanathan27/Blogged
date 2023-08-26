const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("@models");
const { authConfig } = require("@config");

const { JWT_SECRET } = authConfig; // You should move this to a .env or configuration file

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "Token not provided" });
  }
};

const authenticate = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password.");
  }

  return user;
};

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h", // token will expire in 1 hour
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = {
  authenticate,
  generateToken,
  validateToken,
};
