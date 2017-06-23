import {exists} from 'fs'

import chokidar from 'chokidar'
import gulp from 'gulp'
import gulpDevelopServer from 'gulp-develop-server'
import gulpUtil from 'gulp-util'

gulp.task('server:run' ,cb => {
  const sourceFilePath = 'build/server/server.js'
  const watchPath = 'build/server/**/*'
  const commonWatchPath = 'build/common/**/*'

  exists(sourceFilePath ,doesExist => {
    if (!doesExist) {
      gulpUtil.log(`Path \`${sourceFilePath}\` does not exist.`)
    } else {
      gulpDevelopServer.listen({
        path: sourceFilePath ,
      })

      const watcher = chokidar.watch(watchPath ,{
        ignoreInitial: true ,
        usePolling: true ,
      })

      watcher.add(commonWatchPath)

      watcher.on('change' ,() => {
        gulpDevelopServer.restart()
      })
    }

    cb()
  })
})
