const express = require("express");
const fetch = require("node-fetch");
const solar = require("npm-solarsystem");

const app = express();
app.use(express.static("public"));

// Planets API
app.get("/api/planets", (req, res) => {
  res.json(solar.getPlanets());
});

// Pixabay API
app.get("/api/images", async (req, res) => {
  const url = "https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar system";
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// NASA APOD
app.get("/api/nasa", async (req, res) => {
  const url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));