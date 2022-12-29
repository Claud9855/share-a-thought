const express = require('express')
const path = require('path')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001

// initialize express
const app = express()

// middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', api)

app.use(express.static('public'))

//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Get route for feedback page
app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/feedback.html'))
})

// wildcard route to direct users to a 404 page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
