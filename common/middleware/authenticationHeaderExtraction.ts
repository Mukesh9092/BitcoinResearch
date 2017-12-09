import { Application, Response } from "express";
import IAuthenticatedRequest from "../types/IAuthenticatedRequest";

export default function authenticationHeaderExtraction(app: Application) {
  app.use((req: IAuthenticatedRequest, res: Response, next: Function) => {
    const user = req.headers["x-user"];
    const session = req.headers["x-session"];

    req.authentication = {};

    if (user) {
      req.authentication.user = JSON.parse(String(user));
    }

    if (session) {
      req.authentication.session = JSON.parse(String(session));
    }

    next();
  });
}
