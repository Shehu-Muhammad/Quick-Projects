const crud_array = [
    'To-Do List with add/remove tasks',
    'Notes app with localStorage persistence',
    'Contact book (name, phone, email)',
    'Expense tracker with categories',
    'Bookmark manager for links',
    'Shopping list app',
    'Habit tracker (yes/no per day)',
    'Flashcards app (study mode)',
    'Simple calendar with events',
    'Personal journal with date-based entries'
];
const fun_array = [
    'Rock-Paper-Scissors game',
    'Tic-Tac-Toe vs computer',
    'Guess the Number game',
    'Hangman with word list',
    'Memory card matching game',
    'Dice roller (single/multiple dice)',
    'Minesweeper lite (5x5 grid)',
    'Sudoku solver/board generator',
    'Snake game clone',
    'Typing speed test'
];
const data_array = [
    'Currency converter (with API)',
    'Weather app (with OpenWeather API)',
    'Calculator (basic or scientific)',
    'BMI calculator',
    'Loan/EMI calculator',
    'Stopwatch/timer app',
    'Pomodoro timer',
    'QR code generator',
    'Markdown previewer',
    'Unit converter (length, weight, temp)'
];
const api_array = [
    'GitHub user search (API fetch)',
    'Random joke generator',
    'Random quote generator',
    'Trivia quiz app (OpenTDB API)',
    'Movie search app (OMDB API)',
    'Dog/cat picture generator (API)',
    'Dictionary lookup (Free Dictionary API)',
    'News headlines app (NewsAPI)',
    'Crypto price tracker (CoinGecko API)',
    'NASA astronomy picture of the day',
];
const ui_array = [
    'Image carousel/slider',
    'Light/Dark theme toggle app',
    'Drawing pad with canvas',
    'Drag-and-drop task sorter',
    'Progress bar that fills on button click',
    'Collapsible FAQ accordion',
    'Countdown timer to a date',
    'Password generator',
    'Multi-step form (wizard)',
    'Poll/voting app with results chart'
];

// Store shuffled arrays per category
const shuffledArrays = {
    crud: [],
    fun: [],
    data: [],
    api: [],
    ui: []
};

// Duration of fade animation in ms (matches CSS transition)
const fadeDuration = 400;

function getValue(buttonId) {
    const arrayChosen = chooseArray(buttonId);
    if (!arrayChosen) return;

    // Initialize or reshuffle if empty
    if (shuffledArrays[buttonId].length === 0) {
        shuffledArrays[buttonId] = shuffle([...arrayChosen]);
    }

    // Get next project
    const project = shuffledArrays[buttonId].pop();
    const outputElem = document.getElementById(buttonId + "_output");

    // Fade-out, update text, then fade-in
    outputElem.classList.add("fade-out");

    // Force reflow to ensure transition triggers
    outputElem.offsetWidth;

    setTimeout(() => {
        outputElem.textContent = project;          // update text
        outputElem.classList.remove("fade-out");   // fade back in
    }, fadeDuration);
}

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function chooseArray(current) {
    const lookup = {
        crud: crud_array,
        fun: fun_array,
        data: data_array,
        api: api_array,
        ui: ui_array
    };
    return lookup[current] || null;
}

























