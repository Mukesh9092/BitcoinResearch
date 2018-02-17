import { Request, Response } from 'express';

import IAuthenticatedRequest from '../common/types/IAuthenticatedRequest';

export interface IGetInitialPropsContext {
  pathname: string;
  query: {
    [key: string]: any
  };
  asPath: string;

  req?: IAuthenticatedRequest;
  res?: Response;

  err?: Error;
}
