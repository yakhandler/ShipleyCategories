function adjustCircleSizeAndPositionDecks(playerCount) {
  const circleContainer = document.querySelector(".circle-container");
  circleContainer.innerHTML = ""; // Clear existing decks

  // Set dynamic circle width (horizontal expansion for 5+ players)
  let circleWidth, circleHeight = 550;
  if (playerCount <= 4) {
      circleWidth = 550; // Perfect circle
  } else if (playerCount <= 6) {
      circleWidth = 900; // Slightly wider
  } else {
      circleWidth = 1400; // Even wider for 7-8 players
  }

  circleContainer.style.setProperty("--circle-width", `${circleWidth}px`);
  circleContainer.style.setProperty("--circle-height", `${circleHeight}px`);

  // Create decks dynamically
  const radiusX = circleWidth / 2; // Oval horizontal radius
  const radiusY = circleHeight / 2; // Oval vertical radius

  for (let i = 0; i < playerCount; i++) {
    const angle = (360 / playerCount) * i;
    const x = radiusX * Math.cos((angle * Math.PI) / 180);
    const y = radiusY * Math.sin((angle * Math.PI) / 180);

    const deck = document.createElement("div");
    deck.classList.add("deck");
    deck.style.position = "absolute";
    deck.style.transform = `translate(${x}px, ${y}px)`;

    // Unique deck ID
    deck.dataset.index = i;

    deck.innerHTML = `
        <span class="category">Categories</span>
        <img class="card-image" src="darkship.png" alt="dark ship logo" />
    `;

    // Attach click event to flip card
    deck.addEventListener("click", () => flipCard(i));

    circleContainer.appendChild(deck);
}

}


document.addEventListener("DOMContentLoaded", () => {
  // Retrieve player names from localStorage
  const storedNames = localStorage.getItem("playerNames");
  
  if (storedNames) {
      const playerNames = JSON.parse(storedNames);
      console.log("Players:", playerNames); // Debugging check

      adjustCircleSizeAndPositionDecks(playerNames.length); 
      assignPlayersToDecks(playerNames);
      
      // ✅ Initialize `decks` AFTER getting `playerNames`
      const numDecks = playerNames.length;
      decks = Array.from({ length: numDecks }, () => []);

      shuffledMasterDeck.forEach((category, index) => {
          const deckIndex = index % numDecks;
          decks[deckIndex].push(category);
      });

      decks = decks.map((deck) => shuffleArray(deck));

  } else {
      alert("No player data found. Returning to setup.");
      window.location.href = "index.html";
  }
});

// Function to assign players to decks dynamically
function assignPlayersToDecks(playerNames) {
  const deckElements = document.querySelectorAll(".deck");
  
  playerNames.forEach((name, index) => {
      if (deckElements[index]) {
          let playerLabel = document.createElement("div");
          playerLabel.innerText = name;
          playerLabel.classList.add("player-label");
          deckElements[index].appendChild(playerLabel);
      }
  });
}



// Master list of categories
const masterCategories = [
  "Types of fruit",
  "State capitals",
  "Disney animated\nmovies",
  "Sports",
  "Famous authors",
  "Church callings",
  "Pizza toppings",
  "European countries",
  "Types of flowers",
  "Olympic sports",
  "Dog breeds",
  "Movie genres",
  "Musical instruments",
  "Elements on the\nperiodic table",
  "Types of cars",
  "Famous landmarks",
  "Breakfast cereals",
  "Brands of chocolate",
  "U.S. Presidents",
  "Shipley family\nvacation locations",
  "Shapes",
  "Zodiac signs",
  "Handleys",
  "Board games",
  "Superhero names",
  "Languages",
  "Fictional characters",
  "World currencies",
  "Types of cheese",
  "Famous paintings",
  "Mobile phone brands",
  "Shoe brands",
  "Rock bands",
  "Kardashians",
  "Desserts",
  "Musical genres",
  "Types of hats",
  "Reality TV shows",
  "Sea creatures",
  "Fast food\nrestaurants",
  "Marvel movies",
  "Harry Potter\ncharacters",
  "Ice cream flavors",
  "Types of dinosaurs",
  "Tools",
  "Kitchen appliances",
  "Cartoon characters",
  "Dance types",
  "Modes of\ntransportation",
];

// Image mapping for categories
const imageMap = {
  "Types of fruit": "box.png",
  "State capitals": "circles.png",
  "Disney animated\nmovies": "flame.png",
  Sports: "pacman.png",
  "Famous authors": "peace.png",
  "Church callings": "star.png",
  "Pizza toppings": "superman.png",
  "European countries": "triangle.png",
  "Types of flowers": "waves.png",
  "Olympic sports": "yinyang.png",
  "Dog breeds": "box.png",
  "Movie genres": "circles.png",
  "Musical instruments": "flame.png",
  "Elements on the\nperiodic table": "pacman.png",
  "Types of cars": "peace.png",
  "Famous landmarks": "star.png",
  "Breakfast cereals": "superman.png",
  "Brands of chocolate": "triangle.png",
  "U.S. Presidents": "waves.png",
  "Shipley family\nvacation locations": "yinyang.png",
  Shapes: "box.png",
  "Zodiac signs": "circles.png",
  Handleys: "flame.png",
  "Board games": "pacman.png",
  "Superhero names": "peace.png",
  Languages: "star.png",
  "Fictional characters": "superman.png",
  "World currencies": "triangle.png",
  "Types of cheese": "waves.png",
  "Famous paintings": "yinyang.png",
  "Mobile phone brands": "box.png",
  "Shoe brands": "circles.png",
  "Rock bands": "flame.png",
  Kardashians: "pacman.png",
  Desserts: "peace.png",
  "Musical genres": "star.png",
  "Types of hats": "superman.png",
  "Reality TV shows": "triangle.png",
  "Sea creatures": "waves.png",
  "Fast food\nrestaurants": "yinyang.png",
  "Marvel movies": "box.png",
  "Harry Potter\ncharacters": "circles.png",
  "Ice cream flavors": "flame.png",
  "Types of dinosaurs": "pacman.png",
  Tools: "peace.png",
  "Kitchen appliances": "star.png",
  "Cartoon characters": "superman.png",
  "Dance types": "triangle.png",
  "Modes of\ntransportation": "waves.png",
};

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create shuffled master deck
const shuffledMasterDeck = shuffleArray(masterCategories.slice()); // Slice to avoid mutating original array

// Event listeners for flipping cards
document.querySelectorAll(".deck").forEach((deckElement, index) => {
  deckElement.addEventListener("click", () => flipCard(index));
});

function flipCard(deckIndex) {
  const deck = document.querySelector(`.deck[data-index='${deckIndex}']`);
  const categoryElement = deck.querySelector(".category");
  const imageElement = deck.querySelector(".card-image");

  if (!decks[deckIndex] || decks[deckIndex].length === 0) {
      categoryElement.innerText = "Empty";
      imageElement.style.display = "none";
      return;
  }

  // Get next category from the deck
  const category = decks[deckIndex].pop();
  categoryElement.innerText = category;
  imageElement.src = `images/${imageMap[category]}`;
  imageElement.style.display = "block";
}
