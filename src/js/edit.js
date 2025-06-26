let propertyId = null

async function fillFields(search) {
    let params = new URLSearchParams(search)
    propertyId = params.get("id")

    if (propertyId == null) {
        window.location.href = "./error.html"
        return
    }

    let response = await fetch(`http://127.0.0.1:5000/property/${propertyId}`)

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

async function onSubmit(e) {
    e.preventDefault()

    let response = await fetch("http://127.0.0.1:5000/property", {
        method: "PUT",
        headers: {
            "token": sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": propertyId,
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

window.onload = async () => {
    previousOnload()
    await fillFields(window.location.search)

    editForm.addEventListener("submit", onSubmit)
}