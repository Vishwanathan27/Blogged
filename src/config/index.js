const mongoConfig = require("./mongo");
const serverConfig = require("./server");
const authConfig = require("./auth");
const dataConfig = require("./data");
const awsConfig = require("./aws");

module.exports = {
  mongoConfig,
  serverConfig,
  authConfig,
  dataConfig,
  awsConfig,
};
