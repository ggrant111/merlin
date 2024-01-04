let num = []; // Store the sequence to guess
let guess = []; // Store the player's guesses

// Initialize or reset the game state
function startMindBender() {
  num = [];
  guess = [];
  // Reset LED/button states for the game start
  clear1_9();
  setActiveClass(0); // Blink the 0th and 10th button to indicate start
  setActiveClass(10);
  updateUserStatus("Game started. Enter your guess!");
}

// Clear LED/button states for numbers 1-9
function clear1_9() {
  for (let i = 1; i < 10; i++) {
    const button = document.getElementById(`button${i}`);
    if (button) {
      button.classList.remove("active");
    }
  }
}

// Function for drawing a random number (1 to 9)
function drawNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

// Handle the player's guess
function clicked(id) {
  const v = parseInt(id);
  if (v === 0 || v > 9) return; // Ignore invalid inputs

  if (num.length === 0) {
    // First, generate a random sequence if not already generated
    while (num.length < v) {
      let r;
      do {
        r = drawNumber();
      } while (num.includes(r));
      num.push(r);
    }
    console.log("Sequence to guess:", num); // For debugging
    setActiveClass(0, false); // Stop blinking the 0th button
  } else {
    // Handle the user's guess
    guess.push(v);
    setActiveClass(v); // Highlight the guessed number

    if (guess.length === num.length) {
      // Check if the guess is correct
      clear1_9();
      let correctGuesses = 0;
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === num[i]) {
          correctGuesses++;
          setActiveClass(i + 1); // Blink the button for correct guess
        }
      }

      if (correctGuesses === num.length) {
        sounds.win.play(); // Play win sound
        updateUserStatus(
          "You guessed correctly! Press 'New Game' to play again."
        );
      } else {
        sounds.tie.play(); // Play win sound
        updateUserStatus(`You guessed ${correctGuesses} correctly. Try again!`);
      }
      guess = []; // Reset guess for the next round
    }
  }
}

// Update the status message for the user
function updateUserStatus(message) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
}

// Toggle active class for blinking effect
function setActiveClass(number, add = true) {
  const button = document.getElementById(`button${number}`);
  if (button) {
    if (add) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
}
