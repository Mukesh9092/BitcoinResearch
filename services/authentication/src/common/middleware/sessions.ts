import * as connectRedis from "connect-redis";
import * as expressSession from "express-session";
import { Application } from "express";

const { REDIS_HOST, REDIS_PORT, SERVICE_SECRET } = process.env;

const RedisStore = connectRedis(expressSession);

const redisStore = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT
});

export default function sessions(app: Application) {
  app.use(
    expressSession({
      secret: SERVICE_SECRET,
      cookie: {
        path: "/",
        httpOnly: true,
        sameSite: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365
      },
      saveUninitialized: false,
      resave: false,
      rolling: false,
      store: redisStore
    })
  );
}
