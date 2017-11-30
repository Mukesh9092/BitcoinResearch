import morgan from "morgan";

import { isDevelopment } from "../environment";

let preset: string;

if (isDevelopment()) {
  preset = "dev";
} else {
  preset = "common";
}

export default function logger(app: Object) {
  app.use(
    morgan(preset, {
      skip: (req, res) => {
        if (isDevelopment()) {
          if (req.url.match(/^\/_next/)) {
            return true;
          }
        }

        return false;
      }
    })
  );
}
