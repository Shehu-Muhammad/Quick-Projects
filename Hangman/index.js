let words = [];
let secretWord = "";
const guessesRemaining = document.getElementById('guesses');
const maxGuesses = 8;
let currentGuesses = maxGuesses;
let revealedWord = [];
const result = document.getElementById('result');
const container = document.getElementById("letters");
let playBtn = document.getElementById('play');
let custom = document.getElementById('custom');
let show = document.getElementById('show');
let isResetGame = false;
let isGameOver = false;

function toggleShow() {
    const wrapper = document.getElementById("customWrapper");
    const showBtn = document.getElementById("show");

    if (wrapper.classList.contains("hidden")) {
        wrapper.classList.remove("hidden");
        showBtn.value = "Hide Input";
    } else {
        wrapper.classList.add("hidden");
        showBtn.value = "Show Input";
    }
}

function toggleVisibility() {
    const customInput = document.getElementById('custom');
    const toggleBtn = customInput.nextElementSibling; // 👁 button

    if (customInput.type === "password") {
        customInput.type = "text";   // show word
        toggleBtn.style.backgroundColor = "lightgreen"; // visible
    } else {
        customInput.type = "password"; // hide word
        toggleBtn.style.backgroundColor = "lightcoral"; // hidden
    }
}

// Set initial state when page loads
window.onload = () => {
    const customInput = document.getElementById('custom');
    const toggleBtn = customInput.nextElementSibling;
    customInput.type = "password"; // make sure hidden
    toggleBtn.style.backgroundColor = "lightcoral"; // red by default
};

// Load words.txt into array
async function loadWords() {
    const response = await fetch("words.txt");
    const text = await response.text();
    words = text.split("\n").map(w => w.trim().toUpperCase()).filter(w => w);
}

// Pick a random word
function pickRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function showGuesses() {
    currentGuesses = maxGuesses; // reset each new game
    guessesRemaining.innerHTML = `Guesses left: ${maxGuesses}`;
}

function subtractGuess() {
    if(isGameOver) return;

    currentGuesses--;
    guessesRemaining.innerHTML = `Guesses left: ${currentGuesses}`;

    if (currentGuesses === 0) {
        result.innerHTML = `Game Over – You Lose! The word was: ${secretWord}`;
        result.className = "lose";
        endGame();
    }
}

function hiddenWordSpans() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = ""; // clear first

    for (let i = 0; i < secretWord.length; i++) {
        const span = document.createElement("span");
        span.textContent = "_";  // start hidden 
        span.style.margin = "0 5px";
        span.classList.add("letter");
        wordContainer.appendChild(span);
    }
}

function revealLetter(letter, btn) {
    if(isGameOver) return; 
    const letters = document.querySelectorAll("#word .letter");
    let found = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            found = true;
            letters[i].textContent = letter;
            revealedWord[i] = letter;
            btn.classList.add('correct');
        }
    }

    if (revealedWord.join('') === secretWord) {
        result.innerHTML = "YOU WIN!!!"
        result.className = "win";
        endGame();
    }

    if(!found) {
        btn.classList.add('incorrect');
        subtractGuess();
    }
    btn.disabled = true;
}

function displayLetters() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let char of letters) {
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.onclick = () => revealLetter(char, btn);
    container.appendChild(btn);
    }
}

async function play() {
    if(playBtn.value == 'Play Again') {
        isResetGame = true;
    }

    if(isResetGame || isGameOver || playBtn.value == 'PLAY') {

        if (words.length === 0) {
            await loadWords(); // load once
        }
        if (custom.value === '') {
            secretWord = pickRandomWord(); // new random word
        } else {
            secretWord = custom.value.toUpperCase();
        }
        revealedWord = Array(secretWord.length).fill('_');
        isGameOver = false;
        result.innerHTML = "";
        result.className = "";
        container.innerHTML = ""  // removes old buttons
        playBtn.value = 'Play Again';

        hiddenWordSpans();
        displayLetters();
        showGuesses();
    }
}

function endGame() {
    isGameOver = true;
    const buttons = container.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);
    custom.value = '';
}