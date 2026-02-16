let wins = 0;
let losses = 0;
let randomNumber;
let attempts = 0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() { 
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;
   document.querySelector("#attempts").textContent = attempts;
   document.querySelector("#feedback").textContent = "";
   document.querySelector("#guesses").textContent = "";
   document.querySelector("#playerGuess").value = "";
   document.querySelector("#guessBtn").style.display = "inline";
   document.querySelector("#resetBtn").style.display = "none";
   document.querySelector("#playerGuess").focus();
}



function checkGuess() {
    let feedback = document.querySelector("#feedback");
    let playerGuess = Number(document.querySelector("#playerGuess").value);
    if (isNaN(playerGuess)) {
        feedback.textContent = "Please enter a valid number!";
        feedback.style.color = "red";
        return;
    }
    if (playerGuess < 1 || playerGuess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    document.querySelector("#attempts").textContent = attempts;
    document.querySelector("#guesses").textContent += playerGuess + " ";
    if (playerGuess === randomNumber) {
        feedback.textContent = "You win in " + attempts + " attempts!";
        feedback.style.color = "green";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    } else if (attempts === 7) {
        feedback.textContent = "You lost! The number was " + randomNumber;
        feedback.style.color = "red";
        losses++;
        document.querySelector("#losses").textContent = losses;
        gameOver();
    } else if (playerGuess < randomNumber) {
        feedback.textContent = "Too low! Try higher.";
        feedback.style.color = "blue";
    } else {
        feedback.textContent = "Too high! Try lower.";
        feedback.style.color = "blue";
    }
}


function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}
