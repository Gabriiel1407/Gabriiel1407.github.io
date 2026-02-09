console.log("running");

let correctNumber = 13;
let wrongMessageHigh = "your number is greater than the one to guess";
let wrongMessageLow = "your number is lower than the one to guess";
let correctMessage = "Congrats you've guessed the right number";
let correctMessage7 = "Congrats you've guessed the right number within 7 attempts";



let attempts = 0;

let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let guessResult = document.querySelector("#guessResult");
let guessedNumbers = document.querySelector("#guessedNumbers");

/*function displayWinMessage() {
    guessResult.textContent = correctMessage;
    guessResult.style.color = "green";
}*/

guessButton.addEventListener("click", function (){
    attempts += 1;
    guessedNumbers.textContent += guessInput.value +"\n";
    if (correctNumber == guessInput.value) {
        if (attempts <= 7) {
            guessResult.textContent = correctMessage7;
            guessResult.style.color = "green"; 
        } else {
            guessResult.textContent = correctMessage;
            guessResult.style.color = "green"; 
        }
    } else {
        if (correctNumber < guessInput.value) {
            guessResult.textContent = wrongMessageHigh;
            guessResult.style.color = "red";
        } else {
            guessResult.textContent = wrongMessageLow;
            guessResult.style.color = "red";
        }
        
    }
})
