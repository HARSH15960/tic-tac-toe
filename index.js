// Select DOM elements
let boxes = document.querySelectorAll(".box"); // All game boxes
let resetBtn = document.querySelector("#reset"); // Reset button
let newGameBtm = document.querySelector("#new-btn"); // New game button
let msgContainer = document.querySelector(".msg-container"); // Message container
let msg = document.querySelector("#msg"); // Message element to display winner
let turn0 = true; // True for player O's turn, false for player X's turn
let moveCount = 0; // Track the number of moves

// Winning patterns for tic-tac-toe
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
    turn0 = true; // Reset turn to player O
    moveCount = 0; // Reset move count
    enableBoxes(); // Enable all boxes
    msgContainer.classList.add("hide"); // Hide the message container
};

// Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O"; // Player O's turn
            turn0 = false; // Switch turn to player X
        } else {
            box.innerText = "X"; // Player X's turn
            turn0 = true; // Switch turn to player O
        }
        box.disabled = true; // Disable the clicked box
        moveCount++; // Increment move count
        checkWinner(); // Check if there's a winner
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Disable each box
    }
};

// Function to enable all boxes and clear their text
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Enable each box
        box.innerText = ""; // Clear the text in each box
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`; // Display winner message
    msgContainer.classList.remove("hide"); // Show the message container
    disableBoxes(); // Disable all boxes after the game ends
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText; // Value of the first box in the pattern
        let pos2Val = boxes[pattern[1]].innerText; // Value of the second box in the pattern
        let pos3Val = boxes[pattern[2]].innerText; // Value of the third box in the pattern
        
        // Check if the values are not empty and equal
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // If all three are the same, show winner
                return; // Exit the function
            }
        }
    }

    // Check for a draw if all boxes are filled
    if (moveCount === 9) {
        msg.innerText = "Oops! Good luck next time, try again!"; // Display draw message
        msgContainer.classList.remove("hide"); // Show the message container
        setTimeout(resetGame, 3000); // Reset game after 3 seconds
    }
};

// Event listeners for reset and new game buttons
newGameBtm.addEventListener("click", resetGame); // New game button
resetBtn.addEventListener("click", resetGame); // Reset button
