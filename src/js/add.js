async function onSubmit(e) {
    e.preventDefault()
    
    let response = await fetch("http://127.0.0.1:5000/property", {
        method: "POST",
        headers: {
            "token": sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "street": streetField.value,
            "price": priceField.value,
            "plan_id": planField1.checked ? 1 : 2,
            "type_id": typeField1.checked ? 1 : 2,
        })
    })

    if (!response.ok) {
        window.location.href = "./error.html"
        return []
    }

    window.location.href = "./list.html"
}

let previousOnload = window.onload

window.onload = () => {
    previousOnload()

    addForm.addEventListener("submit", onSubmit)
}