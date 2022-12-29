const feedbackForm = document.getElementById('feedback-form')
const homeBtn = document.getElementById('home-btn')

homeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = '/'
})

if(feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let feedback = document.getElementById('feedbackText').value
        let email = document.getElementById('feedbackUsername').value.trim()

        if(!email) {
            email = 'anonymous'
        }

        const newFeedback = {
            feedback,
            email,
            feedbackType: 'Complaint',
        }

        fetch('api/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.status)
            email = ''
            feedback = ''
            
        })
        .catch((error) => {
            console.log('Error:', error)
        })

        document.getElementById('feedbackText').value = ''
        document.getElementById('feedbackUsername').value = 'anonymous'
    })
}