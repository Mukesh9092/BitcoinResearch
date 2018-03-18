import { Application, Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authentication';

export default function authenticationHeaderExtraction(app: Application) {
  app.use((req: Request, res: Response, next: Function) => {
    try {
      const user = req.headers['x-user'];
      // console.log('​authenticationHeaderExtraction -> user', user);

      const session = req.headers['x-session'];
      // console.log('​authenticationHeaderExtraction -> session', session);

      // Needed for typing.
      const authenticatedRequest: AuthenticatedRequest = req as AuthenticatedRequest;

      authenticatedRequest.authentication = {
        user: user === '' ? null : JSON.parse(String(user)),
        session: session === '' ? null : JSON.parse(String(session)),
      };

      next();
    } catch (error) {
      next(error);
    }
  });
}
