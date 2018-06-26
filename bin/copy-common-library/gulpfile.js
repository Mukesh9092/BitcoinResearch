#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const cmd = require('node-cmd')
const gulp = require('gulp')
const async = require('async')

const projectDirectoryPath = path.resolve(`${__dirname}/../..`)
const sourceLibDirectoryPathFragment = 'common'
const targetLibDirectoryPathFragment = 'common'

console.log('Project directory path:', projectDirectoryPath)

function pathIsServiceDirectory(service, cb) {
  fs.stat(`${projectDirectoryPath}/services/${service}`, (error, stat) => {
    if (error) {
      cb(error)
      return
    }

    cb(null, stat.isDirectory())
  })
}

function getServicePaths(cb) {
  fs.readdir(`${projectDirectoryPath}/services`, (error, inodes) => {
    if (error) {
      cb(error)
      return
    }

    async.filter(inodes, pathIsServiceDirectory, (error, serviceInodes) => {
      if (error) {
        cb(error)
        return
      }

      cb(null, serviceInodes)
    })
  })
}

function copyFilesToServices(sourcePath, services, cb) {
  async.each(
    services,
    (service, cb) => {
      const destinationPath = `${projectDirectoryPath}/services/${service}/${targetLibDirectoryPathFragment}`

      console.log(`Copying from "${sourcePath}" to "${destinationPath}".`)

      cmd.get(`rsync -a ${sourcePath}/* ${destinationPath}`, cb)
    },
    cb,
  )
}

gulp.task('copy', (cb) => {
  const from = `${projectDirectoryPath}/${sourceLibDirectoryPathFragment}`

  getServicePaths((error, paths) => {
    if (error) {
      cb(error)
      return
    }

    copyFilesToServices(from, paths, cb)
  })
})

gulp.task('watch', () => {
  const watchPath = `${projectDirectoryPath}/${sourceLibDirectoryPathFragment}/**/*`

  const watcher = gulp.watch(watchPath, ['copy'])
})

gulp.task('default', ['copy', 'watch'])
