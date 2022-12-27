const express = require('express')
const path = require('path')
// const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001

// initialize express
const app = express()

// middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use('/api', api)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
