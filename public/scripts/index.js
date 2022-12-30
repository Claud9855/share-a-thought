const feedbackBtn = document.getElementById('feedback-btn')
const thoughtsContainer = document.getElementById('thought-container')
const thoughtForm = document.getElementById('thought-form')

feedbackBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = '/feedback'
})

const createCard = (thought) => {
    // Create Card
    const cardEl = document.createElement('div')
    cardEl.classList.add('card', 'mb-3', 'm-3')
    cardEl.setAttribute('key', thought.thought_id)

    // Create Card Header
    const cardHeaderEl = document.createElement('h4');
    cardHeaderEl.classList.add('card-header', 'bg-primary', 'text-light', 'p-2', 'm-0')
    cardHeaderEl.innerHTML = `${thought.username} </br>`

    // Create Card Body
    const cardBodyEl = document.createElement('div')
    cardBodyEl.classList.add('card-body', 'bg-light', 'p-2')
    cardBodyEl.innerHTML = `${thought.thought}`

    // Append the header and body to the card element
    cardEl.appendChild(cardHeaderEl)
    cardEl.appendChild(cardBodyEl)

    // Append the card element to the thoughts container in the DOM
    thoughtsContainer.appendChild(cardEl)
}

// Get a list of existing thoughts from the sever
const getThoughts = () => 
    fetch('/api/thoughts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
        console.log('Error', err)
    })


// POST a new thought to the page
const postThought = (thought) => 
    fetch('/api/thoughts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(thought)
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data)
        createCard(thought)
    })
    .catch((err) => {
        console.log('Error', err)
    })


getThoughts().then((data) => data.forEach((thought) => createCard(thought)))

const validateThought = (newThought) => {
    const {username, thought} = newThought

    // Object to hold our error messages until we are ready to return
    const errorState = {
        username: '',
        thought: ''
    }

    // Boolean value if the username is valid 
    const utest = username.length >= 4
    if(!utest) {
        errorState.username = "Invalid username!"
    }

    // Boolean value to see if the thought being added is atleast 15 characters long
    const thoughtContentCheck = thought.length > 15
    if(!thoughtContentCheck) {
        errorState.thought = 'Thought must be at least 15 characters long'
    }

    const result = {
        isValid: !!(utest && thoughtContentCheck),
        errors: errorState
    }

    // Return result object with a isValid boolean and an errors object for any errors that may exist
    return result
}

// Helper function to deal with errors that exist in the result
const showErrors = (errorObj) => {
    const errors = Object.values(errorObj)
    errors.forEach((error) => {
        if(error.length > 0) {
            alert(error)
        }
    })
}

// Helper function to send a POST request to the diagnostics route
const submitDiagnostics = (submissionObj) => {
    fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionObj)
    })
    .then((res) => res.json())
    .then(() => showErrors(submissionObj.errors))
    .catch((err) => {
        console.log('Error', err)
    })
}

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Form submit invoked')

    // Get the value of the thought and save it to a variable
    const thoughtContent = document.getElementById('thoughtText').value 

    // Get the value of the username and save it to a variable
    const thoughtUsername = document.getElementById('thoughtUsername').value.trim()

    // Create an object with the thought and username
    const newThought = {
        username: thoughtUsername,
        thought: thoughtContent
    }

    // Run the thought object through our validator function
    const submission = validateThought(newThought)

    document.getElementById('thoughtText').value = ''
    document.getElementById('thoughtUsername').value = ''

    //If the submission is valid, post thr thought. Otherwise, handle the errors
    return submission.isValid ? postThought(newThought) : submitDiagnostics(submission)
}

// Listen for when the form is submitted
thoughtForm.addEventListener('submit', handleFormSubmit)