async function onSubmit(e) {
    e.preventDefault()
    
    let response = await fetch("http://127.0.0.1:5000/property", {
        method: "POST",
        headers: {
            "token": sessionStorage.getItem("token"),
        },
        body: {
            
        }
    })

    window.location.href = "./list.html"
}

let previousOnload = window.onload

window.onload = () => {
    previousOnload()

    addForm.addEventListener("submit", onSubmit)
}