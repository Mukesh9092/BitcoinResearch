module.exports = app => {
  app.use((req, res, next) => {
    const user = req.user;
    const session = req.session;

    if (user) {
      req.headers["X-User"] = JSON.stringify(user);
    }

    if (session) {
      req.headers["X-Session"] = JSON.stringify(session);
    }

    next();
  });
};
