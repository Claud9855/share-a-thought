const express = require('express')

const thoughtRouter = require('./thoughts')

const app = express()

app.use('/thoughts', thoughtRouter)

module.exports = app