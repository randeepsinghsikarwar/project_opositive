export function UserNameGen() {
  const animalNames = [
    "Tiger",
    "Elephant",
    "Giraffe",
    "Lion",
    "Kangaroo",
    "Koala",
    "Cheetah",
    "Gorilla",
    "Zebra",
    "Panda",
    "Dolphin",
    "Penguin",
    "Polar Bear",
    "Chimpanzee",
    "Rhinoceros",
    "Hippopotamus",
    "Alligator",
    "Komodo Dragon",
    "Bald Eagle",
    "Armadillo",
    "Ostrich",
    "Octopus",
    "Jaguar",
    "Red Fox",
    "Blue Whale",
    "Snow Leopard",
    "Sloth",
    "Sea Turtle",
    "Meerkat",
    "Camel",
    "Red Panda",
    "Hummingbird",
    "Peacock",
    "Gazelle",
    "Otter",
    "Lemur",
    "Armadillo",
    "Komodo Dragon",
    "Aardvark",
    "Tasmanian Devil",
    "Manta Ray",
    "Quokka",
    "Fennec Fox",
    "Mandrill",
    "Axolotl",
    "Platypus",
    "Ocelot",
    "Emu",
  ];

  const adjectives = [
    "Lively",
    "Sparkling",
    "Mysterious",
    "Courageous",
    "Gentle",
    "Vibrant",
    "Soothing",
    "Radiant",
    "Joyful",
    "Spirited",
    "Serene",
    "Whimsical",
    "Captivating",
    "Resilient",
    "Enchanting",
    "Harmonious",
    "Tranquil",
    "Vivacious",
    "Dynamic",
    "Eloquent",
    "Majestic",
    "Graceful",
    "Zealous",
    "Inquisitive",
    "Candid",
    "Dazzling",
    "Mellow",
    "Zealous",
    "Brilliant",
    "Effervescent",
    "Quirky",
    "Energetic",
    "Cheerful",
    "Playful",
    "Blissful",
    "Enthusiastic",
    "Inventive",
    "Sincere",
    "Adventurous",
    "Diligent",
    "Wholesome",
    "Charming",
    "Dynamic",
    "Elegant",
    "Fantastic",
    "Jovial",
    "Magnetic",
    "Nurturing",
  ];

  const randomNumber = Math.floor(Math.random() * 49);

  return adjectives[randomNumber] + " " + animalNames[randomNumber];
}