const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { formatError } = require("../errors");

module.exports = app => {
  console.log("genericExpressService");

  app.use(cookieParser()).use(bodyParser.json());
};
