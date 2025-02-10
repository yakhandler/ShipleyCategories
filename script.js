document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const playerSelection = document.getElementById("player-selection");
  const playerNamesScreen = document.getElementById("player-names");
  const joinGameScreen = document.getElementById("join-game-screen");

  const startGameButton = document.getElementById("start-game");
  const joinGameButton = document.getElementById("join-game");
  const playerButtons = document.querySelectorAll(".player-count");
  const nameForm = document.getElementById("name-form");
  const startMatchButton = document.getElementById("start-match");
  const joinSubmitButton = document.getElementById("join-submit");

  let numPlayers = 0;

  // Ensure only welcome screen is visible at first
  function initializeScreens() {
      playerSelection.style.display = "none";
      playerNamesScreen.style.display = "none";
      joinGameScreen.style.display = "none";
  }
  initializeScreens();

  function showScreen(show, hide) {
      hide.style.opacity = "0";  // Start fade-out
      setTimeout(() => {
          hide.style.display = "none";  // Fully hide after transition
          show.style.display = "flex";  // Show new screen
          setTimeout(() => (show.style.opacity = "1"), 50); // Fade-in
      }, 300); // Timing matches CSS transition duration
  }

  // Start New Game
  startGameButton.addEventListener("click", () => {
      showScreen(playerSelection, welcomeScreen);
  });

  // Selecting number of players
  playerButtons.forEach(button => {
      button.addEventListener("click", (e) => {
          numPlayers = e.target.dataset.count;
          showPlayerNameInputs(numPlayers);
      });
  });

  function showPlayerNameInputs(num) {
      showScreen(playerNamesScreen, playerSelection);
      nameForm.innerHTML = "";

      for (let i = 1; i <= num; i++) {
          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = `Player ${i} Name`;
          input.className = "player-name";
          nameForm.appendChild(input);
      }
  }

  // Start Match Button
  startMatchButton.addEventListener("click", () => {
      const playerNames = [...document.querySelectorAll(".player-name")].map(input => input.value.trim());
      if (playerNames.some(name => name === "")) {
          alert("Please enter all player names.");
          return;
      }
      console.log("Starting Game with players:", playerNames);
  });

  // Join Game
  joinGameButton.addEventListener("click", () => {
      showScreen(joinGameScreen, welcomeScreen);
  });

  // Submitting the name for joining a game
  joinSubmitButton.addEventListener("click", () => {
      const playerName = document.getElementById("join-name").value.trim();
      if (playerName === "") {
          alert("Please enter your name.");
          return;
      }

      console.log(`Player ${playerName} is joining the game`);
  });
});
