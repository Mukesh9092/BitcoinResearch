const gulp = require('gulp')
const seq = require('run-sequence')

require('babel-register')

require('./gulp/tasks/babel')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')

gulp.task('compile', cb => seq(['babel:compile', 'copy:compile'], cb))

gulp.task('watch', cb => seq(['babel:watch', 'copy:watch', 'mocha:watch'], cb))

gulp.task('develop', cb =>
  seq('clean', 'compile', 'mocha:istanbul', ['watch', 'server:run'], cb),
)

gulp.task('production', cb => seq('clean', 'compile', 'server:run', cb))
