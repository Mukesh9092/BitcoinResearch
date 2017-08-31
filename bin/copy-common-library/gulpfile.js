#!/usr/bin/env node

const path = require('path')

const gulp = require('gulp')
const rimraf = require('rimraf')

const projectDirectoryPath = path.resolve(`${__dirname}/../..`)
console.log('Project directory path:', projectDirectoryPath)

gulp.task('clean', (cb) => {
  rimraf(`${projectDirectoryPath}/app/commonLibrary`, (error) => {
    if (error) {
      return cb(error)
    }

    rimraf(`${projectDirectoryPath}/api/commonLibrary`, (error) => {
      if (error) {
        return cb(error)
      }

      cb()
    })
  })
})

gulp.task('copy', () => {
  return gulp.src(`${projectDirectoryPath}/commonLibrary/**/*`)
    .pipe(gulp.dest(`${projectDirectoryPath}/app/commonLibrary`))
    .pipe(gulp.dest(`${projectDirectoryPath}/api/commonLibrary`))
})

gulp.task('watch', () => {
  const watcher = gulp.watch(`${projectDirectoryPath}/commonLibrary/**/*`, ['copy'])
})

gulp.task('default', ['clean', 'copy', 'watch'])
