import { Application, Response } from 'express';
import AuthenticatedRequest from '../types/authentication';

export default function authenticationHeaderExtraction(app: Application) {
  app.use((req: AuthenticatedRequest, res: Response, next: Function) => {
    const user = req.headers['x-user'];
    const session = req.headers['x-session'];

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
