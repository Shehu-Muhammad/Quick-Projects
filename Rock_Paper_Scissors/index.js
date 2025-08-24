const choices = ['ROCK', 'PAPER', 'SCISSORS'];
const playerChoice = document.getElementById('user');
const CPU = document.getElementById('cpu');
const result = document.getElementById('result');

function play() {
    let random = Math.floor(Math.random()*3);
    CPU.value = choices[random];
    if (playerChoice.value == CPU.value) {
        result.value = "It's a draw";
    } else if (
        (playerChoice.value == choices[0] && CPU.value == choices[2]) ||
        (playerChoice.value == choices[1] && CPU.value == choices[0]) ||
        (playerChoice.value == choices[2] && CPU.value == choices[1]) 
    ) {
        result.value = "YOU WIN!!!";
    } else {
        result.value = "CPU WINS!!!";
    }   
}