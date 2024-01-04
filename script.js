// Sounds object
const sounds = {
  0: new Audio("assets/sounds/m0.wav"),
  1: new Audio("assets/sounds/m1.wav"),
  2: new Audio("assets/sounds/m2.wav"),
  3: new Audio("assets/sounds/m3.wav"),
  4: new Audio("assets/sounds/m4.wav"),
  5: new Audio("assets/sounds/m5.wav"),
  6: new Audio("assets/sounds/m6.wav"),
  7: new Audio("assets/sounds/m7.wav"),
  8: new Audio("assets/sounds/m8.wav"),
  9: new Audio("assets/sounds/m9.wav"),
  10: new Audio("assets/sounds/m10.wav"),
  win: new Audio("assets/sounds/mWin.wav"),
  lose: new Audio("assets/sounds/mLose.wav"),
  tie: new Audio("assets/sounds/mTie.wav"),
  init: new Audio("assets/sounds/init.wav"),
  begin: new Audio("assets/sounds/mBegin.wav"),
  buzz: new Audio("assets/sounds/mBuzz.wav"),
  o: new Audio("assets/sounds/mO.wav"),
  x: new Audio("assets/sounds/mX.wav"),
  on: new Audio("assets/sounds/mOn.wav"),
};

let sequence = [];
let userSequence = [];
let active = false;
let isMuted = false;
let currentGameMode = "selecting"; // Ensure this is set when the script loads

// Function to start and prompt for game selection
function start() {
  updateUserStatus(
    "Select a game: 1 for Blackjack, 2 for MindBender, 3 for Echo"
  );
  currentGameMode = "selecting";
  // Reset any game-specific states or clear LEDs/buttons if needed
  clearAllActive(); // Assuming you have a function to clear all active states
}

function clearAllActive() {
  for (let i = 0; i <= 10; i++) {
    const button = document.getElementById(`button${i}`);
    if (button) {
      button.classList.remove("active");
    }
  }
}

// Function to handle button clicks
function clicked(id) {
  console.log("Button clicked, current mode:", currentGameMode);
  const v = parseInt(id);
  if (currentGameMode === "selecting") {
    switch (v) {
      case 1:
        currentGameMode = "blackjack";
        startBlackjack();
        break;
      case 2:
        currentGameMode = "mindbender";
        startMindBender();
        break;
      case 3:
        currentGameMode = "echo";
        startEcho();
        break;
      default:
        updateUserStatus("Invalid selection. Choose 1, 2, or 3.");
        break;
    }
  } else {
    // Delegate to game-specific logic based on currentGameMode
    if (currentGameMode === "blackjack") {
      // Blackjack specific logic
    } else if (currentGameMode === "mindbender") {
      // MindBender specific logic
    } else if (currentGameMode === "echo") {
      // Echo specific logic
    }
  }
}

// Function to generate a random number within the range of buttons
function getRandomButton() {
  return Math.floor(Math.random() * 10) + 1; // Assuming buttons are labeled 1-10
}

// Function to light up and play sound for a button
function lightButton(button) {
  const buttonEl = document.getElementById("button" + button);
  buttonEl.classList.add("active");
  playSound(button);
  setTimeout(() => {
    buttonEl.classList.remove("active");
  }, 400);
}

// Function to play sound for a button
function playSound(button) {
  console.log("Playing sound for button:", button); // See which button is being pressed
  const sound = sounds[button];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  } else {
    console.error("Sound not found for button: " + button);
  }
}

// Function to start the game
function startEcho() {
  sequence = [];
  userSequence = [];
  active = false;
  for (let i = 0; i < 3; i++) {
    // Initial 3 button sequence
    sequence.push(getRandomButton());
  }
  showSequence();
}

// Function to show the sequence to the user
function showSequence() {
  let i = 0;
  const interval = setInterval(() => {
    lightButton(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      active = true; // User can now input
      updateUserStatus("Your turn!");
    }
  }, 600);
}

// Function to check the user's input against the sequence
function checkUserInput(button) {
  if (!active) return;
  const expectedButton = sequence[userSequence.length];
  if (button == expectedButton) {
    userSequence.push(button);
    lightButton(button);
    if (userSequence.length === sequence.length) {
      sequence.push(getRandomButton()); // Add a new button to the sequence
      userSequence = []; // Reset user sequence
      active = false; // Prevent further input while showing the new sequence
      setTimeout(() => {
        showSequence();
        sounds.win.play(); // Play win sound
      }, 1500); // Wait a bit before showing the new sequence
    }
  } else {
    // User got the sequence wrong
    sounds.lose.play(); // Play lose sound
    level = sequence.length - 3;
    updateUserStatus(`Game over! You reached level ${level}.`);
    active = false; // Disable input as the game is over
    sequence = []; // Reset sequence
    userSequence = []; // Reset user sequence
  }
}

// Function to update the status message for the user
function updateUserStatus(message) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
}

// Function to toggle sound
function toggleMute() {
  isMuted = !isMuted;
  document.getElementById("muteBtn").textContent = isMuted
    ? "Unmute Sound"
    : "Mute Sound";
}

// Event listeners and initial setup
document.addEventListener("DOMContentLoaded", function () {
    console.log(currentGameMode);
    start(); // Prompt user for game selection on page load
    document.getElementById("newGame").addEventListener("click", start);
    for (let i = 0; i <= 10; i++) {
      const button = document.getElementById(`button${i}`);
      if (button) {
        button.addEventListener(
          "click",
          (function (num) {
            return function () {
              clicked(num);
            };
          })(i)
        );
      }
    }
  }); // This closing parenthesis and semicolon were missing.
  

  // Start button (assuming you have one)
  // const startBtn = document.getElementById('sameGame');
  // startBtn.addEventListener('click', function () {
  //   startEcho();
  //       updateUserStatus("Watch the sequence!");
  // });

  // Menu and modal functionality
  const menuBtn = document.getElementById("menuBtn");
  const menuOptions = document.getElementById("menuOptions");
  const helpModal = document.getElementById("help-modal");
  const closeMenu = menuOptions.querySelector(".close");
  const helpBtn = document.getElementById("helpBtn");
  const muteBtn = document.getElementById("muteBtn");
  const closeHelp = document.getElementById("closeHelp");

  // Open the menu
  menuBtn.addEventListener("click", function () {
    menuOptions.style.display = "block";
  });

  // Close the menu
  closeMenu.addEventListener("click", function () {
    menuOptions.style.display = "none";
  });

  closeHelp.addEventListener("click", function () {
    helpModal.style.display = "none";
  });

  // Open the help modal from the menu
  helpBtn.addEventListener("click", function () {
    menuOptions.style.display = "none";
    helpModal.style.display = "block";
  });

  // Toggle sound mute/unmute
  muteBtn.addEventListener("click", toggleMute);

  // Close the menu if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target == menuOptions) {
      menuOptions.style.display = "none";
    }
  });


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
// function clicked(id) {
//   const v = parseInt(id);
//   if (v === 0 || v > 9) return; // Ignore invalid inputs

//   if (num.length === 0) {
//     // First, generate a random sequence if not already generated
//     while (num.length < v) {
//       let r;
//       do {
//         r = drawNumber();
//       } while (num.includes(r));
//       num.push(r);
//     }
//     console.log("Sequence to guess:", num); // For debugging
//     setActiveClass(0, false); // Stop blinking the 0th button
//   } else {
//     // Handle the user's guess
//     guess.push(v);
//     setActiveClass(v); // Highlight the guessed number

//     if (guess.length === num.length) {
//       // Check if the guess is correct
//       clear1_9();
//       let correctGuesses = 0;
//       for (let i = 0; i < guess.length; i++) {
//         if (guess[i] === num[i]) {
//           correctGuesses++;
//           setActiveClass(i + 1); // Blink the button for correct guess
//         }
//       }

//       if (correctGuesses === num.length) {
//         sounds.win.play(); // Play win sound
//         updateUserStatus(
//           "You guessed correctly! Press 'New Game' to play again."
//         );
//       } else {
//         sounds.tie.play(); // Play win sound
//         updateUserStatus(`You guessed ${correctGuesses} correctly. Try again!`);
//       }
//       guess = []; // Reset guess for the next round
//     }
//   }
// }

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

// document.addEventListener("DOMContentLoaded", function () {
//   start(); // This should only prompt for game selection
// });

// Start the game initially
// start();

// Event listeners for user interaction
//   document.getElementById('newGame').addEventListener('click', startBlackjack);
document.getElementById("hitMe").addEventListener("click", userHit);
document.getElementById("comp").addEventListener("click", userStand);

// Initialize the game
//   startBlackjack();
