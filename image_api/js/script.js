const select = document.querySelector("menu");
const image = document.querySelector("image");
const links = [
    "https://pixabay.com/get/g3735acee0503891c2f64070fd33ed853aa8368da2e3871ae10f8acee11f07e021e4fe403d727df84039bb3c3839702af59a673eb7ab3b7c2c6d7b8daded5551f_640.jpg",
    "https://pixabay.com/get/gd9f29479526bd7f800d02f2e09982fa2ba4ad1e80508f3569d6fcfa918fb8e70d275715dcf4c4dfe2218b7eab9e55e286a480afe57b3a96d322f8f02c7740d90_640.jpg",
    "https://pixabay.com/get/gdd469dbf4ce27d585444e48129596ed8362f95203ec3335b46addf3c82b8f53d9d068dad5f14847520f57adda1cd452d2b49e426c253660b7d956412e9b37b92_640.png",
    "https://pixabay.com/get/gbfa6762f86ad58a415d27a0b4fc77007ee0f620225eaedb0b1856504421ef9e1e5dbda23b785a0f023c002e32a1dad633743f34e3a244afd867f0e6ab70c9abc_640.jpg",
    "https://pixabay.com/get/gef3610a99cf3649f5d4bd7a34b214913350f6a39944587134dd867ce358bc2eff8cc5cd805e51f169d1c853e6d82ab5b_640.jpg"
]



async function getAPIData() {
  let url = "";
  switch(select.value) {
    case "ocean":
        url = links[0];
        break;
    case "clouds":
        url = links[1];
        break;
    case "flowers":
        url = links[2];
        break;
    case "mountains":
        url = links[3];
        break;
    case "space":
        url = links[4];
        break;
    default:
        url = "";
  }

  try {
       const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
       const data = await response.json();
       image.src = data.hits[0].webformatURL;
       } catch (err) {
             if (err instanceof TypeError) {
                alert("Error accessing API endpoint (network failure)");
              } else {
                alert(err.message);
              }
      } //catch
}
