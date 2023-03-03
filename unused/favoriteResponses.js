const favorites = {};

// Adds an item to favorites, or just increases the item's fave count
const addFavorite = (request, response, name) => {
  let currentFaves = 0;
  if (favorites.name) {
    currentFaves = favorites.name.faves;
  }
  favorites.name = {
    name,
    faves: currentFaves++,
  };
  response.writeHead(201, message); // Maybe change to 204 status?
  response.end();
};

// Lowers a spell's fave count by 1
const removeFavorite = (request, response, name) => {
  favorites.name.faves--;
  response.writeHead(201, message);
  response.end();
};

// Gets current favorites list
const getFavorites = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(favorites));
  response.end();
};

// Clears favorites list (of the current user, based on local storage)

// Returns 3 most favorited spells from favorites
const topThree = (request, response) => {
  const topSpells = [
    { name: 'fireball', faves: -1 },
    { name: 'fireball', faves: -1 },
    { name: 'fireball', faves: -1 },
  ];

  for (const spell in favorites) {
    let currentSpell = spell;
    if (topSpells[0].faves < currentSpell.faves) {
      const temp = currentSpell;
      currentSpell = topSpells[0];
      topSpells[0] = temp;
    }
    if (topSpells[1].faves < currentSpell.faves) {
      const temp = currentSpell;
      currentSpell = topSpells[1];
      topSpells[1] = temp;
    }
    if (topSpells[2].faves < currentSpell.faves) {
      const temp = currentSpell;
      currentSpell = topSpells[2];
      topSpells[2] = temp;
    }
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(topSpells));
  response.end();
};
module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
module.exports.getFavorites = getFavorites;
module.exports.topThree = topThree;
