const { User } = require("@models");
const bcrypt = require("bcryptjs");

module.exports = {
  health: async (_, res) => {
    res.status(201).send("OK");
  },
  register: async (userData) => {
    const user = new User(userData);
    return user.save();
  },
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  compareHashPassword: async (password, hash) => bcrypt.compare(password, hash),
  getUsers: async (req, res) => User.find({}),
};
