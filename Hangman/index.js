const secretWord = 'JAVASCRIPT';
const guessesRemaining = document.getElementById('guesses');
const maxGuesses = 8;
const revealedWord = Array(secretWord.length).fill('_');
const result = document.getElementById('result');
const container = document.getElementById("letters");

function showGuesses() {
    guessesRemaining.innerHTML = maxGuesses;
}

function subtractGuess() {
    if (guessesRemaining.innerHTML == 0) {
        result.innerHTML = "YOU LOSE!!!";
    } else {
        guessesRemaining.innerHTML -= 1;
    }
}

function hiddenWordSpans() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = ""; // clear first

    for (let i = 0; i < secretWord.length; i++) {
        const span = document.createElement("span");
        span.textContent = "_ ";  // start hidden
        span.classList.add("letter");
        wordContainer.appendChild(span);
    }
}

function revealLetter(letter, btn) {
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

function play() { 
    container.innerHTML = ""  // removes old buttons

    hiddenWordSpans();
    displayLetters();
    showGuesses();
}


