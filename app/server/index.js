const next = require("next");

const log = require("../lib/log");
const app = require("./app");

const port = process.env.PORT;

const nextApp = next({
  dev: process.env.NODE_ENV !== "production"
});
const handleRequest = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    handleRequest(req, res);
  });

  app.listen(port, error => {
    if (error) {
      throw error;
    }

    log.info(`> Ready on http://0.0.0.0:${port}`);
  });
});
