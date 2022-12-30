const express = require('express')

const thoughtRouter = require('./thoughts')
const feedbackRouter = require('./feedback')
const diagnosticsRouter = require('./diagnostics')

const app = express()

app.use('/thoughts', thoughtRouter)
app.use('/feedback', feedbackRouter)
app.use('/diagnostics', diagnosticsRouter)

module.exports = app