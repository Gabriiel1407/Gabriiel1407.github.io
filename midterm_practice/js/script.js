let currentQuoteData = null;

async function getAPIData() {
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing the API");
        }
        const data = await response.json();
        currentQuoteData = data;
        document.getElementById("quote").textContent = data.quote;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}
window.addEventListener("DOMContentLoaded", getAPIData);


document.getElementById("display").addEventListener("click", () => {
    if (!currentQuoteData) {
        alert("Quote not loaded");
        return;
    }
    const img = document.getElementById("imageQuote");
    const caption = document.getElementById("captionQuote");
    
    img.src = currentQuoteData.authorImage || "";
    caption.textContent = currentQuoteData.author || "Unknown author";
});

const flags = {
    French: "https://flagcdn.com/w320/fr.png",
    Esperanto: "images/esperanto.jpg",
    English: "https://flagcdn.com/w320/gb.png",
    Spanish: "https://flagcdn.com/w320/es.png"
};

document.getElementById("translateBtn").addEventListener("click", () => {
    let selected = document.querySelector('input[name="language"]:checked');
    if (!selected) {
        alert("select a language");
        return;
    }
    document.getElementById("langImg").src = flags[selected.value];
});