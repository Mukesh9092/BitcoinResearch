const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app
    .use(cookieParser())
    .use(bodyParser.json())
};
