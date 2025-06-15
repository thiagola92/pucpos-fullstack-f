function requestResize() {
    // Firefox solution.
    document.cookie = `frameHeight=${document.body.scrollHeight}`

    // Chrome solution.
    window.parent.postMessage(`frameHeight=${document.body.scrollHeight}`, "*")
}

window.onload = requestResize
window.onresize = requestResize