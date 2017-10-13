const express = require("express");

const { formatError } = require("../errors");

const { SERVICE_HOST, SERVICE_PORT } = process.env;

module.exports = middleware => {
  console.log("expressServiceWith");

  const app = express();

  middleware(app);

  app.listen(SERVICE_PORT, SERVICE_HOST, error => {
    if (error) {
      console.log(formatError(error));
      return;
    }

    console.log(
      `HTTP Server listening at http://${SERVICE_HOST}:${SERVICE_PORT}.`
    );
  });
};
