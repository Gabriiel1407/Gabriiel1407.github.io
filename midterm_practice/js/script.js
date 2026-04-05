let currentQuoteData = null;

async function getAPIData() {
  const url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error accessing the API");
    const data = await response.json();
    currentQuoteData = data;
    document.getElementById("quote").textContent = data.quote;
  } catch (err) {
    if (err instanceof TypeError) alert("Error accessing API endpoint (network failure)");
    else alert(err.message);
  }
}

const flags = {
  French: "https://flagcdn.com/w320/fr.png",
  Esperanto: "images/esperanto.jpg",
  English: "https://flagcdn.com/w320/gb.png",
  Spanish: "https://flagcdn.com/w320/es.png",
};

window.addEventListener("DOMContentLoaded", () => {
  getAPIData();

  document.getElementById("display")?.addEventListener("click", () => {
    if (!currentQuoteData) return alert("Quote not loaded");
    const img = document.getElementById("imageQuote");
    const caption = document.getElementById("captionQuote");
    img.src = currentQuoteData.authorImage || "images/default.jpg";
    caption.textContent = currentQuoteData.author || "Unknown author";
  });

  document.getElementById("translateBtn")?.addEventListener("click", () => {
    const selected = document.querySelector('input[name="language"]:checked');
    if (!selected) return alert("select a language");
    document.getElementById("langImg").src = flags[selected.value] || "";
  });
});