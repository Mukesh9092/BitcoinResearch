import { Request, Response } from "express";

import IAuthenticatedRequest from "../common/types/IAuthenticatedRequest"

export interface IGetInitialPropsContext {
  pathname: string;
  query: string;
  asPath: string;

  req?: IAuthenticatedRequest;
  res?: Response;

  err?: Error;
}
