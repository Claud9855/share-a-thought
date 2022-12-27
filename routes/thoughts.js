const thoughts = require('express').Router
const {v4: uuidv4} = require('uuid')
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require('../helpers/fsUtils')

thoughts.get('/', (req, res) => {
    readFromFile('./db/thoughts.json').then((data) => res.json(JSON.parse(data)))
})