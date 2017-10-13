const redis = require("redis");

require("redis-streams")(redis);

module.exports = redis;
