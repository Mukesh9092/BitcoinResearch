const express = require('express')

const bodyParserMiddleware = require('body-parser')
const compressionMiddleware = require('compression')
const cookieParserMiddleware = require('cookie-parser')
const corsMiddleware = require('cors')
const loggerMiddleware = require('morgan')
const requestIdMiddleware = require('connect-rid')
const responseTimeMiddleware = require('response-time')
const securityMiddleware = require('helmet')

const app = express()
const { NODE_ENV } = process.env

app.set('trust proxy', true)

app.use(requestIdMiddleware())
app.use(securityMiddleware())
app.use(bodyParserMiddleware.json())
app.use(bodyParserMiddleware.urlencoded({ extended: false }))
app.use(cookieParserMiddleware())

app.use(compressionMiddleware())
app.use(responseTimeMiddleware())
app.use(corsMiddleware())
app.use(loggerMiddleware(NODE_ENV === 'develop' ? 'dev' : 'combined'))

module.exports = app
