chokidar = require 'chokidar'
gulp = require 'gulp'
#gulp-develop-server = require 'gulp-develop-server'
gulp-istanbul = require 'gulp-istanbul'
gulp-livescript = require 'gulp-livescript'
gulp-micromatch = require 'gulp-micromatch'
gulp-mocha = require 'gulp-mocha'
gulp-plumber = require 'gulp-plumber'
pify = require 'pify'
rimraf = require 'rimraf'
seq = require 'run-sequence'
{ dirname } = require 'path'

handle-error = (e) ->
  console.log "Error: #{e.stack or e.message or e}"

copy-source-filter = (x) ->
  | x.match /\.ls$/   => false
  | otherwise         => true

clean = ->
  Promise.all [
    (pify rimraf) '.tmp/*'
    (pify rimraf) 'build/*'
  ]

get-source-all-files = -> gulp.src 'src/**/*'
get-source-livescript-files = -> gulp.src 'src/**/*.ls'
get-built-test-files = -> gulp.src 'build/**/*.test.js'

compile-livescript = ->
  get-source-livescript-files!
    .pipe gulp-livescript bare: true
    .on 'error', handle-error
    .pipe gulp.dest 'build'

compile-livescript-path = (source-file-path) !->
  target-file-path = dirname source-file-path.replace 'src', 'build'

  gulp
    .src source-file-path
    .pipe gulp-livescript bare: true
    .on 'error', handle-error
    .pipe gulp.dest target-file-path

compile-copy = ->
  get-source-all-files!
    .pipe gulp-micromatch copy-source-filter,
      dot: true
      extglobs: true
    .pipe gulp.dest 'build'

compile-copy-path = (source-file-path) !->
  target-file-path = dirname source-file-path.replace 'src', 'build'

  if copy-source-filter source-file-path
    gulp
      .src source-file-path
      .pipe gulp.dest target-file-path

test-prepare = ->
  get-built-test-files!
    .pipe gulp-istanbul!
    .pipe gulp-istanbul.hook-require!

test-all = ->
  get-built-test-files!
    .pipe gulp-plumber!
    .pipe gulp-mocha reporter: 'spec'

test-run = ->
  test-all!
    .pipe gulp-istanbul.write-reports do
      dir: '.tmp/istanbul-coverage'

watch = (cb) !->
  source-watcher = chokidar.watch 'src/**/*',
    ignore-initial: true
    use-polling: true

  build-watcher = chokidar.watch 'build/**/*',
    ignore-initial: true
    use-polling: true

  #server-watcher = chokidar.watch 'build/server/**/*',
  #  ignore-initial: true
  #  use-polling: true
  #server-watcher.add 'build/common/**/*'
  #gulp-develop-server.listen path: 'build/server/index.js'
  #server-watcher.on 'change', !->
  #  gulp-develop-server.restart!

  source-watcher.on 'change', (source-file-path) !->
    | source-file-path.match /\.ls$/ => compile-livescript-path source-file-path
    | otherwise                      => compile-copy-path source-file-path

  build-watcher.on 'change', !->
    test-all!

  cb!

gulp.task 'clean', clean
gulp.task 'compile:livescript', compile-livescript
gulp.task 'compile:copy', compile-copy
gulp.task 'compile', (cb) -> seq [ 'compile:copy', 'compile:livescript' ], cb
gulp.task 'test:prepare', test-prepare
gulp.task 'test:run', test-run
gulp.task 'test', (cb) -> seq 'test:prepare', 'test:run', cb
gulp.task 'watch', watch
gulp.task 'develop', (cb) -> seq 'clean', 'compile', 'test', 'watch', cb
gulp.task 'production', (cb) -> seq 'clean', 'compile', cb
gulp.task 'default', (cb) ->
  | process.env.NODE_ENV is 'develop' => seq 'develop', cb
  | otherwise                         => seq 'production', cb
