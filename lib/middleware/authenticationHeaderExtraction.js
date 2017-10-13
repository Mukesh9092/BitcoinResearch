module.exports = app => {
  console.log("authenticationHeaderExtraction");

  app.use((req, res, next) => {
    const user = req.headers["x-user"];
    const session = req.headers["x-session"];

    if (!req.url.match(/_next/)) {
      console.log("authenticationHeaderExtraction request", req.url);
      console.log(
        "authenticationHeaderExtraction request headers",
        req.headers
      );
      console.log("authenticationHeaderExtraction request user", user);
      console.log("authenticationHeaderExtraction request session", session);
    }

    if (user) {
      req.user = JSON.parse(user);
    }

    if (session) {
      req.session = JSON.parse(session);
    }

    next();
  });
};
