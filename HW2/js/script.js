const symbols = [
    { name: 'cherry', emoji: '🍒', multiplier: 3, url: 'https://em-content.zobj.net/source/apple/391/cherries_1f352.png' },
    { name: 'lemon', emoji: '🍋', multiplier: 2, url: 'https://em-content.zobj.net/source/apple/391/lemon_1f34b.png' },
    { name: 'orange', emoji: '🍊', multiplier: 2, url: 'https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png' },
    { name: 'grapes', emoji: '🍇', multiplier: 4, url: 'https://em-content.zobj.net/source/apple/391/grapes_1f347.png' },
    { name: 'watermelon', emoji: '🍉', multiplier: 5, url: 'https://em-content.zobj.net/source/apple/391/watermelon_1f349.png' },
    { name: 'seven', emoji: '7️⃣', multiplier: 10, url: 'images/seven.png' },
    { name: 'diamond', emoji: '💎', multiplier: 15, url: 'https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png' }
];

let balance = 1000;
let spinsCount = 0;
let winsCount = 0;
let biggestWin = 0;
let isSpinning = false;

const balanceElement = document.getElementById('balance');
const betAmountInput = document.getElementById('betAmount');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const messageElement = document.getElementById('message');
const resultElement = document.getElementById('result');
const winAmountElement = document.getElementById('winAmount');
const spinsCountElement = document.getElementById('spinsCount');
const winsCountElement = document.getElementById('winsCount');
const biggestWinElement = document.getElementById('biggestWin');
const resultsDiv = document.querySelector('.results');

const symbol1Img = document.getElementById('symbol1');
const symbol2Img = document.getElementById('symbol2');
const symbol3Img = document.getElementById('symbol3');

function initializeSlots() {
    for (let i = 1; i <= 3; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const imgElement = document.getElementById(`symbol${i}`);
        imgElement.src = randomSymbol.url;
        imgElement.alt = randomSymbol.name;
    }
}

spinButton.addEventListener('click', function() {
    const betAmount = parseInt(betAmountInput.value);
    if (isNaN(betAmount) || betAmount < 10) {
        messageElement.textContent = "Minimum bet is $10!";
        messageElement.style.color = "red";
        return;
    }
    if (betAmount > balance) {
        messageElement.textContent = "Insufficient balance!";
        messageElement.style.color = "red";
        return;
    }
    if (betAmount > 500) {
        messageElement.textContent = "Maximum bet is $500!";
        messageElement.style.color = "red";
        return;
    }
    spin(betAmount);
});
resetButton.addEventListener('click', function() {
    if (confirm("Do you really want to reset the game?")) {
        balance = 1000;
        spinsCount = 0;
        winsCount = 0;
        biggestWin = 0;
        updateDisplay();
        messageElement.textContent = "Game reset! Good luck!";
        messageElement.style.color = "gold";
        resultElement.textContent = "";
        winAmountElement.textContent = "";
        resultsDiv.classList.remove('win', 'lose');
        initializeSlots();
    }
});
function spin(betAmount) {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;
    balance -= betAmount;
    spinsCount++;
    updateDisplay();
    messageElement.textContent = "The wheels are spinning...";
    messageElement.style.color = "gold";
    resultElement.textContent = "";
    winAmountElement.textContent = "";
    resultsDiv.classList.remove('win', 'lose');
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => slot.classList.add('spinning'));
    const results = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
    }
    setTimeout(() => {
        slots.forEach(slot => slot.classList.remove('spinning'));
        symbol1Img.src = results[0].url;
        symbol1Img.alt = results[0].name;
        symbol2Img.src = results[1].url;
        symbol2Img.alt = results[1].name;
        symbol3Img.src = results[2].url;
        symbol3Img.alt = results[2].name;
        checkWin(results, betAmount);     
        isSpinning = false;
        spinButton.disabled = false;
    }, 2000);
}

function checkWin(results, betAmount) {
    if (results[0].name === results[1].name && results[1].name === results[2].name) {
        const winnings = betAmount * results[0].multiplier;
        balance += winnings;
        winsCount++;
        if (winnings > biggestWin) {
            biggestWin = winnings;
        }
        resultElement.textContent = ` JACKPOT! `;
        winAmountElement.textContent = `You won $${winnings}! (${results[0].multiplier}x)`;
        messageElement.textContent = `Three ${results[0].emoji} - Congratulations!`;
        messageElement.style.color = "lime";
        resultsDiv.classList.add('win'); 
    } else if (results[0].name === results[1].name || results[1].name === results[2].name || results[0].name === results[2].name) {
        const winnings = betAmount;
        balance += winnings;
        winsCount++;
        resultElement.textContent = `Two matching symbols!`;
        winAmountElement.textContent = `Bet returned: $${winnings}`;
        messageElement.textContent = "Not bad! Keep going!";
        messageElement.style.color = "yellow";
        resultsDiv.classList.add('win');
    } else {
        resultElement.textContent = `Lost...`;
        winAmountElement.textContent = `You lost $${betAmount}`;
        messageElement.textContent = "Try your luck again!";
        messageElement.style.color = "silver";
        resultsDiv.classList.add('lose');
    }
    updateDisplay();
    if (balance < 10) {
        setTimeout(() => {
            alert("Game Over! You don't have enough money. The game will be reset.");
            resetButton.click();
        }, 1000);
    }
}

function updateDisplay() {
    balanceElement.textContent = balance;
    spinsCountElement.textContent = spinsCount;
    winsCountElement.textContent = winsCount;
    biggestWinElement.textContent = biggestWin;
    if (balance > 1000) {
        balanceElement.style.color = "lime";
    } else if (balance < 500) {
        balanceElement.style.color = "orange";
    } else if (balance < 100) {
        balanceElement.style.color = "red";
    } else {
        balanceElement.style.color = "gold";
    }
}
initializeSlots();
updateDisplay();