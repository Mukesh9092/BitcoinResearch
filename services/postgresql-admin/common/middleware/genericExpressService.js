import cookieParser from 'cookie-parser';
import { json } from 'body-parser';

export default function genericExpressService(app) {
  app.use(cookieParser()).use(json());
}
