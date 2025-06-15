const PATHNAME = window.location.pathname

function loadFrame(path) {
    if (window.location.protocol != "file:") {
        return console.error("Este website foi feito para uso local apenas.")
    }

    indexFrame.height = 0
    indexFrame.src = PATHNAME.replace("/src/index.html", `/src/${path}`)
}

function onFrameMessage(event) {
    if (typeof event.data != "string") {
        return
    }

    let parts = event.data.split("=")

    if (parts.length != 2) {
        return
    }

    if (parts[0] != "frameHeight") {
        return
    }


    console.log(parts[1])
    
    indexFrame.height = parseInt(parts[1])
}

window.addEventListener("message", onFrameMessage)