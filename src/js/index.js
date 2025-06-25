const PATHNAME = window.location.pathname

function loadFrame(path) {
    if (window.location.protocol == "file:") {
        // Caso tenha aberto o arquivo HTML.
        indexFrame.src = PATHNAME.replace("/src/index.html", `/src/${path}`)
    } else {
        // Caso tenha levantado servido com "python -m http.server".
        indexFrame.src = path
    }

    indexFrame.height = 0 // Força o resize após trocar o source.
    loadingBar.style["visibility"] = "visible"
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
        loadingBar.style["visibility"] = "collapse"
    } else if (parts[0] == "token") {
        sessionStorage.setItem("token", parts[1])
        updateTopBar()
    }

}

function onWindowLoad() {
    updateTopBar()

    loadingBar.style["visibility"] = "collapse"
}

function onWindowResize() {
    indexFrame.height = 0
}

function onLogoutClicked() {
    sessionStorage.removeItem("token")
    updateTopBar()
    loadFrame("search.html")
}

window.addEventListener("message", onFrameMessage)

window.onload = onWindowLoad
window.onresize = onWindowResize