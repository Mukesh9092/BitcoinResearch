import {dirname} from 'path'

import chokidar from 'chokidar'
import gulp from 'gulp'
import gulpLivescript from 'gulp-livescript'

import handleError from '../lib/handleError'
import log from '../lib/log'

gulp.task('livescript:compile' ,cb => {
  const sourcePath = 'src/**/*.ls'
  const targetDirectoryPath = 'build'

  return gulp
    .src(sourcePath)
    .pipe(gulpLivescript({ bare: true }))
    .on('error' ,error => {
      // Explicitly only print the error, continue with all files.
      handleError('livescript:compile' ,error)
    })
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('livescript:compile'))
})

gulp.task('livescript:watch' ,cb => {
  const sourceDirectoryPath = 'src'
  const sourcePath = 'src/**/*.ls'
  const targetDirectoryPath = 'build'

  const watcher = chokidar.watch(sourcePath ,{
    ignoreInitial: true ,
    usePolling: true ,
  })

  watcher.on('change' ,sourceFilePath => {
    const targetFilePath = dirname(
      sourceFilePath.replace(sourceDirectoryPath ,targetDirectoryPath) ,
    )

    gulp
      .src(sourceFilePath)
      .pipe(gulpLivescript({ bare: true }))
      .on('error' ,error => {
        handleError('livescript:compile' ,error)

        cb()
      })
      .pipe(gulp.dest(targetFilePath))
      .pipe(log.file('livescript:watch'))
  })

  cb()
})
