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

gulp.task('copy-app', () => {
  return gulp.src('**/*', { base: `${projectDirectoryPath}/commonLibrary` })
    .pipe(gulp.dest(`${projectDirectoryPath}/app/commonLibrary`))
})

gulp.task('copy-api', () => {
  return gulp.src('**/*', { base: `${projectDirectoryPath}/commonLibrary` })
    .pipe(gulp.dest(`${projectDirectoryPath}/api/commonLibrary`))
})

gulp.task('watch', () => {
  const watcher = gulp.watch(`${projectDirectoryPath}/commonLibrary/**/*`, ['copy-app', 'copy-api'])
})

gulp.task('default', ['clean', 'copy-app', 'copy-api', 'watch'])
