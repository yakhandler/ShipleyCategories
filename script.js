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

// Split master deck into four smaller decks
const numDecks = 4;
let decks = Array.from({ length: numDecks }, () => []);

shuffledMasterDeck.forEach((category, index) => {
  const deckIndex = index % numDecks;
  decks[deckIndex].push(category);
});

// Shuffle each deck individually
decks = decks.map((deck) => shuffleArray(deck));

// Event listeners for flipping cards
document.querySelectorAll(".deck").forEach((deckElement, index) => {
  deckElement.addEventListener("click", () => flipCard(index));
});

function flipCard(deckIndex) {
  const deck = decks[deckIndex];
  const deckElement = document.getElementById(`deck${deckIndex + 1}`);
  const categoryElement = deckElement.querySelector(".category");
  const imageElement = deckElement.querySelector(".card-image");
  if (deck.length > 0) {
    const category = deck.pop();
    categoryElement.innerText = category;
    imageElement.src = `images/${imageMap[category]}`;
    imageElement.style.display = "block";
  } else {
    categoryElement.innerText = "Empty";
    imageElement.style.display = "none";
  }
}
