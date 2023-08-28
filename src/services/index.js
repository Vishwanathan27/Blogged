const mongoService = require('./mongo-service');
const userService = require("./user-service");
const authService = require("./auth-service");
const miscService = require("./misc-service");
const postsService = require("./posts-service");
const mediaService = require("./media-service");

module.exports = {
  mongoService,
  userService,
  authService,
  miscService,
  postsService,
  mediaService,
};
