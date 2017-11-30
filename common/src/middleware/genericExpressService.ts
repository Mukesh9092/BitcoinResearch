import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { formatError } from "../errors";

export default function genericExpressService(app: Object) {
  app.use(cookieParser()).use(bodyParser.json());
}
