import * as cookieParser from "cookie-parser";
import { json } from "body-parser";
import { Application } from "express";

export default function genericExpressService(app: Application) {
  app
    .use(cookieParser())
    .use(json());
}
