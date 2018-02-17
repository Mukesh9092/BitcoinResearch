import { Request, Response } from 'express';

export default function logout(req: Request, res: Response, next: Function) {
  const { session } = req;

  if (!session) {
    res.sendStatus(401);
  }

  session &&
    session.destroy((error: Error) => {
      if (error) {
        next(error);
        return;
      }

      req.logout();
      res.sendStatus(200);
    });
}
