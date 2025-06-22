async function onSubmit(e) {
    e.preventDefault()

    await refreshProperties()
}

async function refreshProperties() {
    let url = new URL("http://127.0.0.1:5000/properties")
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
        let plan = properties[i]["plan"]
        let real = price.slice(0, price.length - 2)
        let cents = price.slice(price.length - 2)

        let clon = propertyTemplate.content.cloneNode(true)
        let imgElement = clon.querySelector(".cardImage")
        let textElement = clon.querySelector(".cardText")
        let priceElement = textElement.querySelector(".cardPrice")
        let streetElement = textElement.querySelector(".cardStreet")
        let planElement = textElement.querySelector(".cardPlan")

        imgElement.src = `./images/search/${photo}`
        priceElement.innerText = `R$ ${real},${cents}`
        streetElement.innerText = `${street}`
        planElement.innerText = `${plan}`

        propertiesList.appendChild(clon)
    }
}

let previousOnload = window.onload

window.onload = async () => {
    previousOnload()
    await refreshProperties()

    searchForm.addEventListener("submit", onSubmit)
}
