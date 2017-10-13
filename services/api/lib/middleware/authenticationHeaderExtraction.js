module.exports = app => {
  app.use((req, res, next) => {
    const user = req.headers["X-User"];
    const session = req.headers["X-Session"];

    if (user) {
      req.user = JSON.parse(user);
    }

    if (session) {
      req.session = JSON.parse(session);
    }

    next();
  });
};
