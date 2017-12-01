#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const cpr = require("cpr");
const async = require("async");

const projectDirectoryPath = path.resolve(`${__dirname}/../..`);
const sourceLibDirectoryPathFragment = "common";
const targetLibDirectoryPathFragment = "src/common";

console.log("Project directory path:", projectDirectoryPath);

function pathIsServiceDirectory(service, cb) {
  fs.stat(`${projectDirectoryPath}/services/${service}`, (error, stat) => {
    if (error) {
      cb(error);
      return;
    }

    cb(null, stat.isDirectory());
  });
}

function getServicePaths(cb) {
  fs.readdir(`${projectDirectoryPath}/services`, (error, inodes) => {
    if (error) {
      cb(error);
      return;
    }

    async.filter(inodes, pathIsServiceDirectory, (error, serviceInodes) => {
      if (error) {
        cb(error);
        return;
      }

      cb(null, serviceInodes);
    });
  });
}

function copyFilesToServices(sourcePath, services, cb) {
  async.each(services, (service, cb) => {
    const destinationPath = `${projectDirectoryPath}/services/${service}/${targetLibDirectoryPathFragment}`;

    console.log(`Copying from "${sourcePath}" to "${destinationPath}".`);

    const options = {
      deleteFirst: true,
      overwrite: true,
      confirm: true
    };

    cpr(sourcePath, destinationPath, options, cb);
  }, cb);
}

gulp.task("copy", cb => {
  const from = `${projectDirectoryPath}/${sourceLibDirectoryPathFragment}`;

  getServicePaths((error, paths) => {
    if (error) {
      cb(error);
      return;
    }

    copyFilesToServices(from, paths, cb);
  });
});

gulp.task("watch", () => {
  const watcher = gulp.watch(`${projectDirectoryPath}/${sourceLibDirectoryPathFragment}/**/*`, ["copy"]);
});

gulp.task("default", ["copy", "watch"]);
