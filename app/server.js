const path = require("path");

const express = require("express");
const next = require("next");

const { NODE_ENV, APP_HOST, APP_PORT } = process.env;

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", handle);

  console.log(`> Starting server...`);

  server.listen(APP_PORT, APP_HOST, error => {
    if (error) {
      throw error;
    }

    console.log(`> Ready on http://${APP_HOST}:${APP_PORT}`);
  });
});
