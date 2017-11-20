const morgan = require("morgan");

const { isDevelopment } = require("../environment");

const preset = isDevelopment() ? "dev" : "common";

module.exports = app => {
  app.use(
    morgan(preset, {
      skip: (req, res) => {
        if (isDevelopment()) {
          if (req.url.match(/^\/_next/)) {
            return true;
          }
        }

        return false;
      }
    })
  );
};
