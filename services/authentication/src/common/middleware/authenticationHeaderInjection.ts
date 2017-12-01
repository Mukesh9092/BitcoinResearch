export default function authenticationHeaderInjection(app: Object) {
  app.use((req, res, next) => {
    const { user, session } = req;

    /*
    if (!req.url.match(/_next/)) {
      console.log("authenticationHeaderInjection request", req.url);
      console.log("authenticationHeaderInjection request headers", req.headers);
      console.log("authenticationHeaderInjection request user", user);
      console.log("authenticationHeaderInjection request session", session);
    }
    */

    if (user) {
      req.headers["x-user"] = JSON.stringify(user);
    }

    if (session) {
      req.headers["x-session"] = JSON.stringify(session);
    }

    next();
  });
}
