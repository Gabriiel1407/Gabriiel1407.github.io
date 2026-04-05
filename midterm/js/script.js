document.addEventListener("DOMContentLoaded", function() {
    loadRandDest();
    displayRandCountry();
    document.querySelector("#Country").addEventListener("change", updateCity);
    document.querySelector("#City").addEventListener("change", displayCity);
});

async function loadRandDest() {
    let url = "https://csumb.space/api/otterairlines/destinationsAPI.php?city=random";
    let response = await fetch(url);
    let data = await response.json();
    let figure = document.querySelector("#figDest");
    figure.innerHTML = `<img id="imgDest" src="${data.image}" width="250">
        <figcaption id="imgCaption">${data.city}</figcaption>`;
    let price = document.querySelector("#price");
    price.innerHTML += data.price;
    let departures = document.querySelector("#departures");
    departures.innerHTML += data.departures;
}

async function displayRandCountry() {
    let options = [ 
        {text:"France", value:"fr"},
        {text:"China", value:"cn"},
        {text:"Mexico", value:"mx"},
        {text:"United States", value:"us"}
    ];
    options.sort(() => Math.random() -0.5);
    let container = document.getElementById("Country");
    options.forEach(opt => {
        container.innerHTML += `
        <option value="${opt.value}">${opt.text}</option>`;
    });
}

async function updateCity() {
    let country = document.querySelector("#Country").value;
    let url = `https://csumb.space/api/otterairlines/citiesAPI.php?country=${country}`;
    let response = await fetch(url);
    let data = await response.json();
    let container = document.querySelector("#City");
    container.innerHTML = "";
    data.forEach(opt => {
        container.innerHTML += `
        <option value="${opt.id}">${opt.city}</option>`;
    });
}

async function displayCity() {
    let city = document.querySelector("#City").value;
    let url = `https://csumb.space/api/otterairlines/destinationsAPI.php?city=${city}`;
    let response = await fetch(url);
    let data = await response.json();
    let figure = document.querySelector("#figDest");
    figure.innerHTML = `<img id="imgDest" src="${data.image}" width="250">
        <figcaption id="imgCaption">${data.city}</figcaption>`;
    let price = document.querySelector("#price");
    price.innerHTML = data.price;
    let departures = document.querySelector("#departures");
    departures.innerHTML = data.departures;
}