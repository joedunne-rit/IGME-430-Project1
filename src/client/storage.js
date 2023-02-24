// Default data for storage, keyword used for accessing storage
const defaultData = {
  favorites: [],
};
const keyword = 'jmd1494-spellbook-app';

// Retrieves currently stored data from storage and returns said data, used for funcitons in this file
function readStorage() {
  let storedData = null;

  try {
    storedData = JSON.parse(localStorage.getItem(keyword)) || defaultData;
  } catch (err) {
    console.log(`Error encountered while retrieving info from ${keyword}`);
    throw err;
  }

  return storedData;
}

// Writes new set of data to storage, used for functions in this file
function writeStorage(newData) {
  localStorage.setItem(keyword, JSON.stringify(newData));
}

// Adds a new item to favorites
export function addFavorite(newSpell) {
  const storedData = readStorage();
  storedData.favorites.push(newSpell);
  writeStorage(storedData);
  console.log(`${newSpell} added to favorites`);
}

// Stores search settings
export function storeSettings(currentSettings) {
  const storedData = readStorage();
  storedData.settings = currentSettings;
  writeStorage(storedData);
}

// Gets currently stored search settings
export function getSettings() {
  const storedData = readStorage();
  return storedData.settings;
}

// Gets list of favorites from storage
export function getFavorites() {
  return readStorage().favorites;
}

// Checks to see if spell is already in favorites
export function checkFavorites(spell) {
  const storedData = readStorage();
  for (const item of storedData.favorites) {
    if (item == spell) { return true; }
  }
  return false;
}

// Clears storage entirely, resetting it to defaultData
export const clearStorage = () => writeStorage(defaultData);

// Clears just favorites in local storage
export function clearFavorites() {
  const storedData = readStorage();
  storedData.favorites = defaultData.favorites;
  writeStorage(storedData);
}

// For later: create function for removing just 1 favorite
