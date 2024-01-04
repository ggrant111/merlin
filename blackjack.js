// BlackJack Game Logic

let userTotal = 0;
let merlinTotal = 0;

// Function to manage the active class for buttons
function setActiveClass(number) {
  const button = document.getElementById(`button${number}`);
  if (button) {
    button.classList.add("active"); // Add the active class to the button
  }
}

// Function to start a new Blackjack game
function startBlackjack() {
  userTotal = 0;
  merlinTotal = 0;
  active = true; // Ensure the game is set as active

  // Initial draw for user and Merlin
  let userInitialDraw = drawNumber();
  let merlinInitialDraw = drawNumber();
  merlinTotal += merlinInitialDraw;
  startBlinking(merlinInitialDraw); // Start blinking Merlin's initial number

  userTotal += userInitialDraw;
  merlinTotal += merlinInitialDraw;

  setActiveClass(userInitialDraw); // Set active class for user's initial draw
  // Optionally, if you want to visually indicate Merlin's draw:
  setActiveClass(merlinInitialDraw);

  updateUserStatus(
    `Your total: ${userTotal}. Press 'Hit Me' to draw or 'Stand' to hold.`
  );
}

// Function for drawing a random number (1 to 10)
function drawNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

// User decides to draw a number
function userHit() {
  if (active && userTotal < 13) {
    let drawn = drawNumber();
    userTotal += drawn;
    playSound(drawn); // Play the sound for the drawn number
    setActiveClass(drawn); // Set the active class on the corresponding button
    if (userTotal > 13) {
      updateUserStatus(`You drew ${drawn}. Total: ${userTotal}. Bust!`);
      sounds.lose.play(); // Play lose sound
      endGame(false); // User loses
    } else {
      updateUserStatus(
        `You drew ${drawn}. Total: ${userTotal}. Press 'Hit Me' to draw again or 'Stand'.`
      );
    }
  }
}

// User decides to stand, Merlin's turn
function userStand() {
  while (merlinTotal < userTotal && merlinTotal < 13) {
    merlinTotal += drawNumber();
  }
  // Check outcomes
  if (merlinTotal > 13 || userTotal > merlinTotal) {
    sounds.win.play(); // Play win sound
    endGame(true); // User wins
  } else if (merlinTotal === userTotal) {
    sounds.tie.play(); // Play tie sound
    updateUserStatus(`Tie game. Merlin's total: ${merlinTotal}.`);
  } else {
    sounds.lose.play(); // Play lose sound
    endGame(false); // User loses
  }
}

// End the game with a win (true) or lose (false)
function endGame(didUserWin) {
  let resultMessage = didUserWin ? "You win!" : "You lose!";
  updateUserStatus(
    resultMessage +
      ` Your total: ${userTotal}. Merlin's total: ${merlinTotal}. Press 'New Game' to play again.`
  );

  // Delay the clearing of active classes and stopping of blinking
  setTimeout(() => {
    for (let i = 1; i <= 10; i++) {
      const button = document.getElementById(`button${i}`);
      if (button) {
        button.classList.remove("active");
      }
    }
    stopBlinking(); // Stop blinking when the game ends
  }, 2000); // Delay of 2000 milliseconds (2 seconds)
}

// Update the status message for the user
function updateUserStatus(message) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
}

// Global variable to keep track of the blinking interval
let blinkingInterval;

// Function to start blinking a button
function startBlinking(number) {
  const button = document.getElementById(`button${number}`);
  if (button) {
    blinkingInterval = setInterval(() => {
      button.classList.toggle("active");
    }, 500); // Blink every 500 milliseconds (0.5 seconds)
  }
}

// Function to stop blinking
function stopBlinking() {
  clearInterval(blinkingInterval);
  // Optionally, remove the active class after stopping the blinking
  for (let i = 1; i <= 10; i++) {
    const button = document.getElementById(`button${i}`);
    if (button) {
      button.classList.remove("active");
    }
  }
}

document.getElementById("hitMe").addEventListener("click", userHit);
document.getElementById("comp").addEventListener("click", userStand);
