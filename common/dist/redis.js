"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var redis_streams_1 = require("redis-streams");
redis_streams_1.default(redis_1.default);
exports.default = redis_1.default;
