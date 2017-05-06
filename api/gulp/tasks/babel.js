import { dirname } from 'path'

import chokidar from 'chokidar'
import gulp from 'gulp'
import gulpBabel from 'gulp-babel'

import handleError from '../lib/handleError'
import log from '../lib/log'

gulp.task('babel:compile', (cb) => {
  const sourcePath = 'src/**/*.js'
  const targetDirectoryPath = 'build'

  return gulp
    .src(sourcePath)
    .pipe(gulpBabel())
    .on('error', (error) => {
      // Explicitly only print the error, continue with all files.
      handleError('babel:compile', error)
    })
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('babel:compile'))
})

gulp.task('babel:watch', (cb) => {
  const sourceDirectoryPath = 'src'
  const sourcePath = 'src/**/*.js'
  const targetDirectoryPath = 'build'

  const watcher = chokidar.watch(sourcePath, {
    ignoreInitial: true,
    usePolling: true,
  })

  watcher.on('change', (sourceFilePath) => {
    const targetFilePath = dirname(
      sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath),
    )

    gulp
      .src(sourceFilePath)
      .pipe(gulpBabel())
      .on('error', (error) => {
        handleError('babel:compile', error)

        cb()
      })
      .pipe(gulp.dest(targetFilePath))
      .pipe(log.file('babel:watch'))
  })

  cb()
})
