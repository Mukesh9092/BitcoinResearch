import { Application, Request } from 'express'
import { Server } from 'http'

export interface IApplicationWithHTTPServer extends Application {
  server?: Server
}

export interface IAuthenticatedRequest extends Request {
  authentication?: {
    user: string;
    session: string;
  }
}
