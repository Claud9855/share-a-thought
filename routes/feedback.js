const feedback = require('express').Router()
const {v4: uuidv4} = require('uuid')
const {readAndAppend, readFromFile} =require('../helpers/fsUtils')

// GET route for retrieving all the feedback
feedback.get('/', (req, res) => {
    readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
})

// POST route for submitting a feedback
feedback.post('/', (req, res) => {
    const {email, feedbackType, feedback} = req.body

    if(email && feedbackType && feedback) {
        const newFeedBack = {
            email,
            feedbackType,
            feedback,
            feedback_id: uuidv4(),
        }

        readAndAppend(newFeedBack, './db/feedback.json')

        const response = {
            status: 'success',
            body: newFeedBack
        }

        res.json(response)
    }
    else {
        res.json('Error in posting feedback')
    }
})

module.exports = feedback