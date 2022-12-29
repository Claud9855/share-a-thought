const express = require('express')

const thoughtRouter = require('./thoughts')
const feedbackRouter = require('./feedback')

const app = express()

app.use('/thoughts', thoughtRouter)
app.use('/feedback', feedbackRouter)

module.exports = app