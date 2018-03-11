import { Application, Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authentication';

export default function authenticationHeaderExtraction(app: Application) {
  app.use((req: Request, res: Response, next: Function) => {
    try {
      const user = req.headers['x-user'];
      const session = req.headers['x-session'];

      if (!user) {
        throw new Error('No user header found');
      }

      if (!session) {
        throw new Error('No session header found');
      }

      const authenticatedRequest: AuthenticatedRequest = req as AuthenticatedRequest;

      authenticatedRequest.authentication = {
        user: JSON.parse(String(user)),
        session: JSON.parse(String(session)),
      };

      next();
    } catch (error) {
      next(error);
    }
  });
}
