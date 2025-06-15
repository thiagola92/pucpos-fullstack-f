const PATHNAME = window.location.pathname
let waitingFrame = false

function loadFrame(path) {
    if (window.location.protocol != "file:") {
        return console.error("Este website foi feito para uso local apenas.")
    }

    indexFrame.src = PATHNAME.replace("/src/index.html", `/src/${path}`)
    
    onFrameChanged()
}

function onFrameChanged() {
    indexFrame.height = 0
    waitingFrame = true

    setTimeout(resizeFrame, 250)
}

function onFrameMessage(event) {
    let parts = event.data.split("=")

    if (parts.length != 2) {
        return
    }

    if (parts[0] != "frameHeight") {
        return
    }

    console.log("Here")
    console.log(event.data)

    resizeFrame(parts[1])
}

function resizeFrame(frameHeight = null) {
    if (!waitingFrame) {
        return
    }

    // Firefox solution.
    if (frameHeight == null) {
        frameHeight = getCookie("frameHeight")

        if (frameHeight == null) {
            setTimeout(resizeFrame, 100)
            return
        }
    }

    waitingFrame = false
    indexFrame.height = parseInt(frameHeight)
}

function getCookie(name) {
    for (let c of document.cookie.split('; ')) {
        let [n, v] = c.split("=", 2)

        if (name == n) {
            return v
        }
    }

    return null
}

window.onresize = () => {
    onFrameChanged()
}

window.onload = () => {
    indexFrame.onload = onFrameChanged
    onFrameChanged()
}

window.addEventListener("message", onFrameMessage)