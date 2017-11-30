"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_redis_1 = require("connect-redis");
var express_session_1 = require("express-session");
var _a = process.env, REDIS_HOST = _a.REDIS_HOST, REDIS_PORT = _a.REDIS_PORT, SERVICE_SECRET = _a.SERVICE_SECRET;
var RedisStore = connect_redis_1.default(express_session_1.default);
var redisStore = new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT
});
function sessions(app) {
    app.use(express_session_1.default({
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
    }));
}
exports.default = sessions;
