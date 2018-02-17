import { Request } from 'express';

interface AuthenticatedRequestSessionCookie {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  path: string;
  sameSite: boolean;
}

interface AuthenticatedRequestSession {
  cookie: AuthenticatedRequestSessionCookie;
}

export interface AuthenticatedRequest extends Request {
  authentication: {
    session: AuthenticatedRequestSession;
    user: string;
  };
}
