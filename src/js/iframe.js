function requestResize() {
    window.parent.postMessage(`frameHeight=${document.body.scrollHeight}`, "*")

    // As vezes a mensagem chega antes da iframe calcular o tamanho real,
    // então mandar novamente não faz mal.
    setTimeout(() => {
        window.parent.postMessage(`frameHeight=${document.body.scrollHeight}`, "*")
    }, 500)
}

window.onload = requestResize
window.onresize = requestResize