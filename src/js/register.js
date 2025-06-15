async function onSubmit(e) {
    e.preventDefault()

    let form = new FormData()
    form.append("name", nameField.value)
    form.append("cpf", cpfField.value)
    form.append("phone", phoneField.value)
    form.append("email", emailField.value)
    form.append("password", passwordField.value)
    
    let response = await fetch(
        "http://127.0.0.1:5000/auth/register", {method: "POST", body: form}
    )

    if (!response.ok) {
        window.location.href = "./error.html"
        return
    }

    window.location.href = "./search.html"
}

let previousOnload = window.onload

window.onload = () => {
    previousOnload()
    
    registration.addEventListener("submit", onSubmit)
}