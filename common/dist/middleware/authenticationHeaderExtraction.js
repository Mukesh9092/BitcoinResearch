"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authenticationHeaderExtraction(app) {
    app.use(function (req, res, next) {
        var user = req.headers["x-user"];
        var session = req.headers["x-session"];
        /*
        if (!req.url.match(/_next/)) {
          console.log("authenticationHeaderExtraction request", req.url);
          console.log("authenticationHeaderExtraction request headers", req.headers);
          console.log("authenticationHeaderExtraction request user", user);
          console.log("authenticationHeaderExtraction request session", session);
        }
        */
        if (user) {
            req.user = JSON.parse(user);
        }
        if (session) {
            req.session = JSON.parse(session);
        }
        next();
    });
}
exports.default = authenticationHeaderExtraction;
