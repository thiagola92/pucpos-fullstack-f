function requestResize() {
    setTimeout(() => {
        window.parent.postMessage(`frameHeight=${document.body.scrollHeight}`, "*")
    }, 100)
}

window.onload = requestResize
window.onresize = requestResize