#!/usr/bin/env node

const path = require("path");

const gulp = require("gulp");
const cpr = require("cpr");
const async = require("async");

const projectDirectoryPath = path.resolve(`${__dirname}/../..`);
console.log("Project directory path:", projectDirectoryPath);

const services = [
  "api",
  "application",
  "authentication",
  "proxy",
  "redis",
  "redis-commander",
  "rethinkdb"
];

gulp.task("copy", cb => {
  const from = `${projectDirectoryPath}/lib`;

  async.each(
    services,
    (service, cb) => {
      const to = `${projectDirectoryPath}/services/${service}/lib`;

      console.log(`Copying from "${from}" to "${to}".`);

      cpr(
        from,
        to,
        {
          deleteFirst: true,
          overwrite: true,
          confirm: true
        },
        cb
      );
    },
    cb
  );
});

gulp.task("watch", () => {
  const watcher = gulp.watch(`${projectDirectoryPath}/lib/**/*`, ["copy"]);
});

gulp.task("default", ["copy", "watch"]);
