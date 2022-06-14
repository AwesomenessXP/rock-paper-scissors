// variables for score and counter
let games = 0;
let computerPoints = 0;
let userPoints = 0;
const userScoreDiv = document.querySelector("#userScore");
const computerScoreDiv = document.querySelector("#compScore");
const endScreen = document.querySelector("#screen");
const resetBtn = endScreen.querySelector("button");
endScreen.style.display = "none"; // end screen is hidden when the game plays
const buttons = document.querySelectorAll(".selectBtn");

// User and computer choose rock/paper, or scissors
function computerPlay() {
    let compResult = ['rock', 'paper', 'scissors']; // these are the options the computer chooses from
    return compResult[Math.floor(Math.random()*compResult.length)];
}

let result;
function userPlay() {
    //result = `${result.slice(0,1).toLowerCase()}${result.slice(1, result.length).toLowerCase()}`; // the string will be a combination of first letter + rest of the word
    if (result == "rock" || result == "paper" || result == "scissors") {
        return result; //return computer's decision
    }// if
    else { // will likely never happen
        console.log("ERROR");
    }// else
}

// get outcome of the game
let outcome; // outcome will return (true = user won) or (false = computer won) 
const descBox = document.querySelector("#selector");
function playRound(user, computer) {
    if (user === computer) {
        descBox.textContent = `Tie! You and the computer chose ${user}.`;
        return null;
    }// if
    if ((user === "rock" && computer === "paper") || (user === "paper" && computer === "scissors") || 
            (user === "scissors" && computer === "rock")){
        descBox.textContent = `You Lose! ${computer} beats ${user}.`;
        return 0;
    }// if
    else {
        descBox.textContent = `You Win! ${user} beats ${computer}.`;
        return 1;
    }// else
}

// event listener for when the user clicks a button
buttons.forEach((selection) => {
    selection.addEventListener("click", () => {
        console.log(selection.id);
        result = selection.id;
        ++games;
        game();
    });
});

// at the end of the game, show the reset button screen
resetBtn.addEventListener('click', () => {
    computerScoreDiv.textContent = 0;
    userScoreDiv.textContent = 0;
    endScreen.style.display = "none";
    descBox.textContent = "Choose rock, paper, or scissors";
});

// this is what happens in a single game, if user or comp gets to 5 points, game ends
function game () {
    outcome = playRound(userPlay(), computerPlay());

    if (outcome !== null) { // outcome is true (or 1), then user wins
        if (outcome) {
            userScoreDiv.textContent = ++userPoints;
            console.log(userPoints);
        }
        else {
            computerScoreDiv.textContent = ++computerPoints;
            console.log(computerPoints);
        }// else
    }// if

    if (userPoints === 5 || computerPoints === 5) {
        if (userPoints > computerPoints) {
            descBox.textContent = "YOU ARE THE WINNER!!";
        }// if
        else if (userPoints < computerPoints) {
            descBox.textContent = "YOU LOST!! GET GOOD LMAO";
        }// else if
        else {
            descBox.textContent = "An even game for you and the computer.";
        }// else
        userPoints = 0;
        computerPoints = 0;
        games = 0;

        endScreen.style.display = "block"; // end screen is shown at the end of the game. why? so we cant interact with the rock/paper/scissors buttons
    }// if

}// game()