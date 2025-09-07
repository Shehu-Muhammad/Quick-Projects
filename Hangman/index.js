let words = [];
let secretWord = "";
const guessesRemaining = document.getElementById('guesses');
const maxGuesses = 8;
let currentGuesses = maxGuesses;
let revealedWord = [];
const result = document.getElementById('result');
const container = document.getElementById("letters");
let playBtn = document.getElementById('play');
let isResetGame = false;
let isGameOver = false;

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
        secretWord = pickRandomWord(); // new random word
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
}