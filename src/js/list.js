async function onAddClick() {
    window.location.href = "./add.html"
}

async function onDeleteClick(property_id) {
    await refreshList()
}

async function refreshList() {
    let url = new URL("http://127.0.0.1:5000/properties")

    // Zero quer dizer sua conta.
    url.searchParams.append("account_id", 0)
    
    let response = await fetch(url.href, {
        headers: {
            "token": sessionStorage.getItem("token"),
        }
    })

    if (!response.ok) {
        window.location.href = "./error.html"
        return []
    }
    
    let properties = await response.json()
    propertiesRows.innerHTML = ""

    for (let i in properties) {
        let clon = rowTemplate.content.cloneNode(true)

        let streetNode = clon.querySelector(".street")
        let planNode = clon.querySelector(".plan")
        let priceNode = clon.querySelector(".price")

        let price = properties[i]["price"].toString()
        let plan = properties[i]["plan"]
        let street = properties[i]["address"]["street"]
        let real = price.slice(0, price.length - 2)
        let cents = price.slice(price.length - 2)

        streetNode.innerText = street
        planNode.innerText = plan
        priceNode.innerText = `R$ ${real},${cents}`

        propertiesRows.appendChild(clon)
    }
}

let previousOnload = window.onload

window.onload = async () => {
    previousOnload()
    await refreshList()
}