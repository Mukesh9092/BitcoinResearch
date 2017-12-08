import { Application } from "express";

export default function authenticationHeaderInjection(app: Application) {
  app.use((req, res, next) => {
    const { user, session } = req;

    if (user) {
      req.headers["x-user"] = JSON.stringify(user);
    }

    if (session) {
      req.headers["x-session"] = JSON.stringify(session);
    }

    next();
  });
}
