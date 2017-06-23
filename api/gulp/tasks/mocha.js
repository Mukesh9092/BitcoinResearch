import chokidar from 'chokidar'
import gulp from 'gulp'
import gulpIstanbul from 'gulp-istanbul'
import gulpMicromatch from 'gulp-micromatch'
import gulpMocha from 'gulp-mocha'
import gulpPlumber from 'gulp-plumber'

import handleError from '../lib/handleError'

gulp.task('mocha:istanbul' ,cb => {
  const coverageDirectoryPath = '.tmp/istanbul-coverage'
  const reporter = 'spec'
  const sourceFilter = x => !x.match(/\.test\.js$/)
  const sourcePath = 'build/**/*.js'
  const testSourceFilter = x => x.match(/\.test\.js$/)
  const testSourcePath = 'build/**/*.js'

  const prepareSource = cb => {
    gulp
      .src(sourcePath)
      .pipe(gulpMicromatch(sourceFilter))
      .pipe(gulpIstanbul())
      .pipe(gulpIstanbul.hookRequire())
      .on('data' ,() => {})
      .on('end' ,cb)
  }

  const runTests = cb => {
    gulp
      .src(testSourcePath)
      .pipe(gulpMicromatch(testSourceFilter))
      .pipe(gulpPlumber())
      .pipe(
        gulpMocha({
          reporter ,
        }) ,
      )
      .pipe(
        gulpIstanbul.writeReports({
          dir: coverageDirectoryPath ,
        }) ,
      )
      .on('end' ,cb)
  }

  prepareSource(() => {
    runTests(() => {
      cb()
    })
  })
})

gulp.task('mocha:watch' ,cb => {
  const reporter = 'spec'
  const sourceDirectoryPath = 'build'
  const sourceFilter = x => x
  const sourcePath = 'build/**/*.js'
  const testSourceFilter = x => x.match(/\.test\.js$/)
  const testSourcePath = 'build/**/*.js'

  const watcher = chokidar.watch(sourcePath ,{
    ignoreInitial: true ,
    usePolling: true ,
  })

  watcher.on('change' ,() => {
    gulp
      .src(testSourcePath)
      .pipe(gulpMicromatch(testSourceFilter))
      .pipe(gulpPlumber())
      .pipe(
        gulpMocha({
          reporter ,
        }) ,
      )
  })

  cb()
})
