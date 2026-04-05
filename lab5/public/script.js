// RANDOM IMAGE
fetch("/api/images")
.then(res => res.json())
.then(data => {
  if(document.getElementById("randomImg")){
    let images = data.hits;
    let random = Math.floor(Math.random() * images.length);
    document.getElementById("randomImg").src = images[random].webformatURL;
  }
});

// NASA POD
fetch("/api/nasa")
.then(res => res.json())
.then(data => {
  if(document.getElementById("nasaImg")){
    document.getElementById("nasaImg").src = data.url;
    document.getElementById("desc").innerText = data.explanation;
  }
});

// PLANETS
fetch("/api/planets")
.then(res => res.json())
.then(data => {
  if(document.getElementById("planets")){
    let container = document.getElementById("planets");

    data.forEach(p => {
      let div = document.createElement("div");
      div.innerHTML = `
        <h2>${p.name}</h2>
        <p>Diameter: ${p.diameter}</p>
        <p>Mass: ${p.mass}</p>
        <p>Gravity: ${p.gravity}</p>
      `;
      container.appendChild(div);
    });
  }
});
