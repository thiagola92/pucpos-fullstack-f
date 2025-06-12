// Não estamos hosteando um server, isso quer dizer que não podemos
// utilizar funções como fetch() para pegar conteúdo de outras páginas
// para atualizar nossa <iframe>.
//
// O que fazemos aqui? Deduzimos o caminho do arquivo HTML a ser
// carregado na nossa <iframe> e atualizamos a referência dela.
const PROJECT_DIR = "/src/"
const PATHNAME = window.location.pathname

function loadFrame(path) {
    if (window.location.protocol != "file:") {
        return console.error("Este website foi feito uso local apenas.")
    }

    let parts = PATHNAME.split(PROJECT_DIR)
    mainFrame.src = [parts[0], path].join(PROJECT_DIR)
    mainFrame.height = 0

    setTimeout(resizeFrame, 250)
}

function resizeFrame() {
    var frameHeight = getCookie("frameHeight")

    if (frameHeight == null) {
        setTimeout(resizeFrame, 100)
        return
    }

    mainFrame.height = parseInt(getCookie("frameHeight"))
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
