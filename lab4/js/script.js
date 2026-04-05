document.addEventListener("DOMContentLoaded", function() {
  loadStates();
  document.querySelector("#zipCodeInput").addEventListener("change", getCityInfo);
  document.querySelector("#state").addEventListener("change", getCounties);
  document.querySelector("#username").addEventListener("input", checkUsername);
  document.querySelector("#password").addEventListener("focus", suggestPassword);
  document.querySelector("#submitBtn").addEventListener("click", validateForm);
});


async function getCityInfo() {
  let zip = document.querySelector("#zipCodeInput").value;
  if (zip.trim() === "") {
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").innerHTML = "";
    document.querySelector("#longitude").innerHTML = "";
    document.querySelector("#zipMessage").innerHTML = "";
    return;
  }
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (!data || data.city === undefined) {
      throw new Error;
    }
    document.querySelector("#zipMessage").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
  } catch(err) {
    document.querySelector("#zipMessage").innerHTML = "Zip code not found";
    document.querySelector("#zipMessage").style.color = "red";
    document.querySelector("#city").innerHTML = "?";
    document.querySelector("#latitude").innerHTML = "?";
    document.querySelector("#longitude").innerHTML = "?";
    return;
  }
} 

 
async function loadStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";
  let response = await fetch(url);
  let data = await response.json();
  let stateSelect = document.querySelector("#state");
  data.forEach(state => {
    stateSelect.innerHTML += `<option value="${state.usps}">${state.state}</option>`;
  });
}


async function getCounties() {
  let state = document.querySelector("#state").value;
  let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
  let response = await fetch(url);
  let data = await response.json();
  let countySelect = document.querySelector("#county");
  countySelect.innerHTML = "";
  data.forEach(county => {
      countySelect.innerHTML += `<option>${county.county}</option>`;
  });
}


async function checkUsername() {
  let username = document.querySelector("#username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();
  let message = document.querySelector("#usernameMessage");
  if (data.available) {
      message.innerHTML = "Username available";
      message.style.color = "rgb(0, 184, 0)";
  } else {
      message.innerHTML = "Username not available";
      message.style.color = "red";
  }
}


function suggestPassword() {
  let suggestion = Math.random().toString(36).slice(-8);
  document.querySelector("#passwordSuggestion").innerHTML = "Suggested password: " + suggestion;
}


function validateForm(event) {
  event.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let password2 = document.querySelector("#password2").value;
  let message = document.querySelector("#usernameMessage");
  if (username.length < 3) {
    alert("Username must have at least 3 characters");
    return;
  }
  if (message.style.color == "red") {
    alert("The username is not available");
    return;
  }
  if (password.length < 6) {
    alert("Password must have at least 6 characters");
    return;
  }
  if (password !== password2) {
    alert("Passwords do not match");
    return;
  }
  alert("Form is valid!");
}