import { dirname } from 'path'

import _ from 'lodash'
import chokidar from 'chokidar'
import gulp from 'gulp'
import gulpMicromatch from 'gulp-micromatch'
import gulpUtil from 'gulp-util'
import { parallel } from 'async'

import handleError from '../lib/handleError'
import log from '../lib/log'

function sourceFilter(x) {
  switch (false) {
    case !x.match(/\.less$/):
      return false

    case !x.match(/\.ls$/):
      return false

    case !x.match(/\.js$/):
      return false

    default:
      return true
  }
}

gulp.task('copy:compile', (cb) => {
  const sourcePaths = [{
    sourcePath: 'src/**/*',
    targetDirectoryPath: 'build',
  }]

  function copyPath(path) {
    return (cb) => {
      gulp.src(path.sourcePath)
        .pipe(gulpMicromatch(sourceFilter, {
          dot: true,
          extglobs: true,
        }))
        .pipe(gulp.dest(path.targetDirectoryPath))
        .on('end', () => {
          gulpUtil.log('copy:compile', path.sourcePath)

          cb()
        })
    }
  }

  parallel(_.map(sourcePaths, copyPath), (error) => {
    if (error) {
      return cb(error)
    }

    cb()
  })
})

gulp.task('copy:watch', (cb) => {
  const sourceDirectoryPath = 'src'
  const sourcePath = 'src/**/*'
  const targetDirectoryPath = 'build'

  const watcher = chokidar.watch(sourcePath, {
    ignoreInitial: true,
    usePolling: true,
  })

  watcher.on('change', (sourceFilePath) => {
    const targetFilePath = dirname(sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath))

    if (sourceFilter(sourceFilePath)) {
      gulp.src(sourceFilePath)
        .pipe(gulp.dest(targetFilePath))
        .pipe(log.file('copy:watch'))
    }
  })

  cb()
})
