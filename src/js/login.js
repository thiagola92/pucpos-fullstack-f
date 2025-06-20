async function onSubmit(e) {
    e.preventDefault()

    let form = new FormData()
    form.append("email", emailField.value)
    form.append("password", passwordField.value)
    
    let response = await fetch(
        "http://127.0.0.1:5000/auth/login", {method: "POST", body: form}
    )

    if (!response.ok) {
        window.location.href = "./error.html"
        return
    }

    let token = await response.text()
    
    sessionStorage.setItem("token", token)
    window.parent.postMessage(`token=${token}`, "*")

    window.location.href = "./search.html"
}

let previousOnload = window.onload

window.onload = () => {
    previousOnload()

    login.addEventListener("submit", onSubmit)
}