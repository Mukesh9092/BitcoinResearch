import { Request } from "express";

type AuthenticatedRequestSessionCookie = {
  originalMaxAge: number,
  expires: string,
  secure: boolean,
  httpOnly: boolean,
  path: string,
  sameSite: boolean,
}

type AuthenticatedRequestSession = {
  cookie: AuthenticatedRequestSessionCookie,
}

export default interface IAuthenticatedRequest extends Request {
  authentication?: {
    user?: string;
    session?: AuthenticatedRequestSession;
  }
}