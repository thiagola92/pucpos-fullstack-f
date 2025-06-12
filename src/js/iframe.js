function updateCookie() {
    document.cookie = `frameHeight=${document.body.scrollHeight}`
}

window.onload = updateCookie
window.onresize = updateCookie