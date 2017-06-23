import gulp from 'gulp'
import gulpUtil from 'gulp-util'
import rimraf from 'rimraf'
import _ from 'lodash'
import {parallel} from 'async'
import handleError from '../lib/handleError'

function removePath(path) {
  return function(cb) {
    rimraf(path ,error => {
      if (error) {
        return cb(error)
      }

      gulpUtil.log('clean' ,`Cleaned \`${path}\`.`)

      cb()
    })
  }
}

function clean(cb) {
  parallel(_.map(['build/*' ,'.tmp/*'] ,removePath) ,error => {
    if (error) {
      return cb(error)
    }

    cb()
  })
}

gulp.task('clean' ,clean)
