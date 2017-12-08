import { Application, Request, Response } from "express";

export default function authenticationHeaderExtraction(app: Application) {
  app.use((req: Request, res: Response, next: Function) => {
    const user = req.headers["x-user"];
    const session = req.headers["x-session"];

    if (user) {
      req.user = JSON.parse(String(user));
    }

    if (session) {
      req.session = JSON.parse(String(session));
    }

    next();
  });
}
