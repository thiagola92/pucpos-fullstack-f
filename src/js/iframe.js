function requestResize() {
    // É incrivelmente chato lidar com as pequenas diferenças
    // de Firefox e Chrome sobre quando cade um decide calcular
    // o tamanho da iframe...
    // Escolhi por só botar um delay grande.
    setTimeout(() => {
        window.parent.postMessage(`frameHeight=${document.body.scrollHeight}`, "*")
    }, 250)
}

window.onload = requestResize
window.onresize = requestResize