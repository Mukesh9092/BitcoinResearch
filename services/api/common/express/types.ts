import { Server } from 'http'
import { Application, Request } from 'express'

export interface ApplicationWithHTTPServer extends Application {
  server?: Server
}

export interface AuthenticatedRequest extends Request {
  authentication?: {
    user: string
    session: string
  }
}
