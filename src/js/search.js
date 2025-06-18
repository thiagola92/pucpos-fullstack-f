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
        let clon = propertyTemplate.content.cloneNode(true)

        let img = clon.querySelector(".cardImage")
        let photo = properties[i]["photo"]

        let text = clon.querySelector(".cardText")
        let price = properties[i]["price"].toString()
        let street = properties[i]["address"]["street"]
        let real = price.slice(0, price.length - 2)
        let cents = price.slice(price.length - 2)

        img.src = `./images/search/${photo}`
        text.innerHTML = `R$ ${real},${cents}<br>${street}`

        propertiesList.appendChild(clon)
    }
}

let previousOnload = window.onload

window.onload = async () => {
    previousOnload()
    await refreshProperties()

    searchForm.addEventListener("submit", onSubmit)
}
