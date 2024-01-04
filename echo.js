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
  