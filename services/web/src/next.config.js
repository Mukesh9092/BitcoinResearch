const withCss = require('@zeit/next-css')

const options = withCss({ distDir: '../dist' })

module.exports = options
