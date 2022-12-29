const feedbackBtn = document.getElementById('feedback-btn')

feedbackBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = '/feedback'
})