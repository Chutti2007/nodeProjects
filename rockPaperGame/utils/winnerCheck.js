let allWinConditions = [{
    "scissors": ["paper", "lizard"],
    "rock": ["lizard", "scissors"],
    "paper": ["rock", "spock"],
    "lizard": ["paper", "spock"],
    "spock": ["rock", "scissors"]
}];

function checkWinner(choice1, choice2) {
    if (choice1 != "" && choice2 != "") {

        if (choice1 == choice2) {
            return "Draw";
        }
        if (allWinConditions[0].choice1.includes(choice2)) {
            console.log(allWinConditions[0].choice1);
            return "player1 win"
        }
        else {
            return "Player 2 win";
        }

    }
}
