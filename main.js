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
  });
  
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
  