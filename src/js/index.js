const PATHNAME = window.location.pathname

function loadFrame(path) {
    if (window.location.protocol != "file:") {
        return console.error("Este website foi feito para uso local apenas.")
    }

    indexFrame.height = 0
    indexFrame.scrollHeight = 0
    indexFrame.src = PATHNAME.replace("/src/index.html", `/src/${path}`)
}

function updateTopBar() {
    let token = sessionStorage.getItem("token")

    if (token == null || token.length == 0) {
        listButton.hidden = true
        logoutButton.hidden = true
        registerButton.hidden = false
        loginButton.hidden = false
    } else {
        listButton.hidden = false
        logoutButton.hidden = false
        registerButton.hidden = true
        loginButton.hidden = true
    }
}

function onFrameMessage(event) {
    if (typeof event.data != "string") {
        return
    }

    let parts = event.data.split("=")

    if (parts.length != 2) {
        return
    }

    if (parts[0] == "frameHeight") {
        indexFrame.height = parseInt(parts[1])
    } else if (parts[0] == "token") {
        sessionStorage.setItem("token", parts[1])
        updateTopBar()
    }

}

function onWindowLoad() {
    updateTopBar()
}

function onLogoutClicked() {
    sessionStorage.removeItem("token")
    updateTopBar()
    loadFrame("search.html")
}

window.addEventListener("message", onFrameMessage)

window.onload = onWindowLoad