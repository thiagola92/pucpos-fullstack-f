async function fillFields(search) {
    let params = new URLSearchParams(search)
    let id = params.get("id")

    if (id == null) {
        window.location.href = "./error.html"
        return
    }

    let response = await fetch(`http://127.0.0.1:5000/property/${id}`)

    if (!response.ok) {
        window.location.href = "./error.html"
        return
    }

    let body = await response.json()

    streetField.value = body["address"]["street"]
    priceField.value = body["price"] / 100
    planField1.checked = body["plan_id"] == 1 
    planField2.checked = body["plan_id"] == 2 
    typeField1.checked = body["type_id"] == 1 
    typeField2.checked = body["type_id"] == 2 
}

let previousOnload = window.onload

window.onload = async () => {
    previousOnload()
    await fillFields(window.location.search)
}