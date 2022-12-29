/**
 * JS FORTHE 404 PAGE
 **/
const goBackBtn = document.getElementById('back')

goBackBtn.addEventListener('click', (e) => {
    e.preventDefault
    // Built-in browser interface that allows changing the browser session history, or in this case to go back
    history.back()
})