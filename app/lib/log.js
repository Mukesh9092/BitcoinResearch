import log from "loglevel";

const dev = process.env.NODE_ENV !== "production";
const logLevel = dev ? "debug" : "info";

log.info(`Setting loglevel to: ${logLevel}`);
log.setLevel(logLevel);

export default log;
