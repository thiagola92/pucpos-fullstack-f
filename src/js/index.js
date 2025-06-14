const PATHNAME = window.location.pathname

function loadFrame(path) {
    if (window.location.protocol != "file:") {
        return console.error("Este website foi feito para uso local apenas.")
    }

    indexFrame.src = PATHNAME.replace("/src/index.html", `/src/${path}`)

    onFrameChanged()
}

function onFrameChanged() {
    indexFrame.height = 0

    setTimeout(resizeFrame, 250)
}

function resizeFrame() {
    var frameHeight = getCookie("frameHeight")

    if (frameHeight == null) {
        setTimeout(resizeFrame, 100)
        return
    }

    indexFrame.height = parseInt(getCookie("frameHeight"))
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