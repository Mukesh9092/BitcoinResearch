const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { formatError } = require("../errors");

module.exports = app => {
  app.use(cookieParser()).use(bodyParser.json());
};
