const thoughts = require('express').Router()
const {v4: uuidv4} = require('uuid')
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require('../helpers/fsUtils')

// GET route for retrieving all the thoughts
thoughts.get('/', (req, res) => {
    readFromFile('./db/thoughts.json').then((data) => res.json(JSON.parse(data)))
})

//Get route for a specific thought
thoughts.get('/:thought_id', (req, res) => {
    const thoughtId = req.params.thought_id
    readFromFile('./db/thoughts.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((thought) => thought.thought_id === thoughtId)
        return result.length > 0 ? res.json(result) : res.json('No thought with that ID')
    })
})

// DELETE route for a specific thought
thoughts.delete('/:thought_id', (req, res) => {
    const thoughtId = req.params.thought_id
    readFromFile('./db/thoughts.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array of all thoughts except 
        // for the one with th ID provided in the URL
        const result = json.filter((thought) => thought.thought_id !== thoughtId)

        writeToFile('./db/thoughts.json', result)

        res.json(`Item ${thoughtId} has been deleted.`)
    })
})

// POST route for a new thought post
thoughts.post('/', (req, res) => {
    console.log(req.body);

    const {username, thought} = req.body

    if(req.body) {
        const newThought = {
            username,
            thought,
            thought_id: uuidv4()
        }

        readAndAppend(newThought, './db/thoughts.json')
        res.json('thought added successfully.')
    }
    else {
        res.error('error in adding thought')
    }
})

module.exports = thoughts