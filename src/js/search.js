async function onSubmit(e) {
    e.preventDefault()

    await refreshProperties()
}

async function refreshProperties() {
    let planBit = 0
    planBit += buyField.checked ? 1 : 0
    planBit += rentField.checked ? 2 : 0

    let typeBit = 0
    typeBit += houseField.checked ? 1 : 0
    typeBit += flatField.checked ? 2 : 0

    let url = new URL("http://127.0.0.1:5000/properties")
    url.searchParams.append("plan", planBit)
    url.searchParams.append("type", typeBit)
    url.searchParams.append("street", searchField.value)
    
    let response = await fetch(url.href)

    if (!response.ok) {
        window.location.href = "./error.html"
        return []
    }

    let properties = await response.json()
    propertiesList.innerHTML = ""

    for (let i in properties) {
        let photo = properties[i]["photo"]
        let price = properties[i]["price"].toString()
        let street = properties[i]["address"]["street"]
        let plan = properties[i]["plan"]["action"]
        let real = price.slice(0, price.length - 2)
        let cents = price.slice(price.length - 2)

        let clon = propertyTemplate.content.cloneNode(true)
        let imgNode = clon.querySelector(".cardImage")
        let textNode = clon.querySelector(".cardText")
        let priceNode = textNode.querySelector(".cardPrice")
        let streetNode = textNode.querySelector(".cardStreet")
        let planNode = textNode.querySelector(".cardPlan")

        imgNode.src = `./images/search/${photo}`
        priceNode.innerText = `R$ ${real},${cents}`
        streetNode.innerText = `${street}`
        planNode.innerText = `${plan}`

        propertiesList.appendChild(clon)
    }
}

let previousOnload = window.onload

window.onload = async () => {
    previousOnload()
    await refreshProperties()

    searchForm.addEventListener("submit", onSubmit)
}
