# Rock Paper Scissors Game

A simple **Rock Paper Scissors** game built with **HTML** and **Vanilla JavaScript**. The player selects Rock, Paper, or Scissors, clicks the play button, and the CPU randomly chooses its move. The app then displays the winner.

## Features

- Select **Rock**, **Paper**, or **Scissors**
- Click **Play** to start the round
- CPU makes a random choice
- Displays the CPU choice
- Displays the game result
- Built with plain HTML and JavaScript

## Tech Stack

- **HTML5**
- **Vanilla JavaScript**

## How It Works

1. The player selects a move from the dropdown
2. The player clicks the **Play** button
3. JavaScript generates a random choice for the CPU
4. The app compares both choices
5. The result is displayed as:
   - Draw
   - Player win
   - CPU win

## Project Structure

```bash
ROCK_PAPER_SCISSORS/
│── index.html
│── index.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shehu-Muhammad/Quick-Projects.git
```

### 2. Open the project folder

```bash
cd ROCK_PAPER_SCISSORS
```

### 3. Run the app

Open `index.html` in your browser.

## Game Logic

The game uses a simple array of choices:

```js
const choices = ['ROCK', 'PAPER', 'SCISSORS'];
```

When the player clicks **Play**, JavaScript:

- Randomly selects one of the three choices for the CPU
- Compares the player's choice against the CPU choice
- Displays the winner based on standard Rock Paper Scissors rules

## Future Improvements

- Add CSS styling for a better UI
- Show icons or images for each choice
- Keep score for player and CPU
- Add multiple rounds
- Add animations for the results
- Make the layout responsive for mobile

## Lessons Learned

This project helped strengthen skills in:

- DOM selection
- Handling user input
- Using functions in JavaScript
- Generating random values
- Writing conditional logic
- Updating values on the page dynamically

## Live Demo

[Live Demo](https://dev-arcade-game-rock-paper-scissors.vercel.app/)

## Screenshots

Add screenshots here if you want to showcase the game UI.

## Author

**Shehu Muhammad**

- GitHub: [Shehu-Muhammad](https://github.com/Shehu-Muhammad)

## License

This project is open source and available under the [MIT License](LICENSE).
