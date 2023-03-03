import * as storage from './storage.js';
import * as spellResult from './search-result.js';
import * as firebase from './firebase.js';
import * as spellItem from './spell-item.js';

const searchBar = document.querySelector('#search-bar');
const dndclass = document.querySelector('#class');
const school = document.querySelector('#school');
const level = document.querySelector('#level');
const concentration = document.querySelector('#concentration');
const ritual = document.querySelector('#ritual');
const limit = document.querySelector('#result-limit');
const searchButton = document.querySelector('#btn-search');
const clearButton = document.querySelector('#btn-clear');
const listCreator = document.querySelector('#list-creator');
const saveButton = document.querySelector('#btn-save');
const loadButton = document.querySelector('#btn-load');
const userInput = document.querySelector('#user-name');
const listInput = document.querySelector('#list-name');
const results = document.querySelector('#element-card-holder');
const status = document.querySelector('#element-status');

const spellList = [];

// Assigns functions to buttons
const init = () => {
  console.log('initializing');
  searchButton.onclick = searcher;
  clearButton.onclick = clear;
  saveButton.onclick = saveSpells;
  //loadButton.onclick = loadSpells;

  const storedSettings = storage.getSettings();
  searchBar.value = storedSettings.spellName;
  dndclass.value = storedSettings.class;
  school.value = storedSettings.school;
  level.value = storedSettings.level;
  concentration.checked = storedSettings.concentration;
  ritual.checked = storedSettings.ritual;
  limit.value = storedSettings.limit;
  searcher();
};

// Executes search when search button is clicked
function searcher() {
  status.innerHTML = 'Searching...';
  const urlBase = 'https://api.open5e.com/spells';
  loadJsonFetch(constructURL(urlBase));
  console.log('search clicked');
  const settings = {
    spellName: searchBar.value,
    class: dndclass.value,
    school: school.value,
    level: level.value,
    concentration: concentration.checked,
    ritual: ritual.checked,
    limit: limit.value,
  };
  storage.storeSettings(settings);
}

// Clears results when clear button is clicked
function clear() {
  results.innerHTML = '';
  status.innerHTML = 'Results cleared';
}

// Constructs a url based on input
// Values to do: range, components, duration, casting time
function constructURL(urlBase) {
  let url = `${urlBase}/?search=${searchBar.value}`;
  if (dndclass.value != '--') {
    url += `&dnd_class=${dndclass.value}`;
  }
  if (school.value != '--') {
    url += `&school=${school.value}`;
  }
  if (level.value != '--') {
    if (level.value == 'Cantrip') { url += '&level_int__iexact=0'; } else { url += `&level_int__iexact=${level.value}`; }
  }
  if (concentration.checked) {
    url += '&concentration=yes';
  }
  url += `&limit=${limit.value}`;
  console.log(url);
  return url;
}

// Adds spell to favorites, increases total favorites in database by 1
const addFavorite = (spellObj) => {
  console.log(spellObj);
  firebase.writeFaveData(spellObj);
};

// Creates a list of results to display
function createResultList(array) {
  results.innerHTML = '';
  // If there are no results, says so
  if (array.length == 0) {
    status.innerHTML = 'No results found';
    return;
  }
  for (const object of array) {
    if (ritual.checked && object.ritual == 'no') {
      // Skips the object if ritaul cast is specified and it can't be ritual casted
    } else {
      const newCard = spellResult.createResult(object);
      newCard.callback = addFavorite;
      results.appendChild(newCard);
    }
  }
  status.innerHTML = 'Results found';
}

//Add a spell list item
export function addItem(name, level) {
  //Only adds item if it does not already exist
  for (let spell of spellList){
    if (spell == name){
      console.log("item added already");
      return;
    }
  }
  if(!spellList[name]){
    //Adds to spellList item
    spellList.push(name);
    console.log(spellList);
    //Creates item to display for user
    let newItem = spellItem.createSpell(name);
    //Determines which level to place item
    let levelSection;
    switch (level) {
      case '0th-level': levelSection = listCreator.querySelector('#list0'); break;
      case '1st-level': levelSection = listCreator.querySelector('#list1'); break;
      case '2nd-level': levelSection = listCreator.querySelector('#list2'); break;
      case '3rd-level': levelSection = listCreator.querySelector('#list3'); break;
      case '4th-level': levelSection = listCreator.querySelector('#list4'); break;
      case '5th-level': levelSection = listCreator.querySelector('#list5'); break;
      case '6th-level': levelSection = listCreator.querySelector('#list6'); break;
      case '7th-level': levelSection = listCreator.querySelector('#list7'); break;
      case '8th-level': levelSection = listCreator.querySelector('#list8'); break;
      case '9th-level': levelSection = listCreator.querySelector('#list9'); break;
    }
    levelSection.appendChild(newItem);
  }
}

//Remove a spell list item
export function removeItem(name) {
  let i = 0;
  for (let spell of spellList){
    if (spell == name){
      spellList.splice(i, 1);
      console.log(spellList);
      return;
    }
    i++;
  }
}

async function saveSpells() {
  //Construct url using data from spell list
  const userName = userInput.value;
  const listName = listInput.value;
  const spellbookData = `name=${userName}&list=${listName}&spells=${spellList.toString()}`;
  let response = await fetch('/saveSpells', {
    method: 'POST',
    body: spellbookData
  })

  //Handle response, create visuals for whether it saved successfully or not
  let obj = await response.json();

  console.log(obj.message);
}

// fetches json from api
async function loadJsonFetch(url) {
  // await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
  // note: default limit for open5e is 50 results unless otherwise specified
  const response = await fetch(url);

  // await ("stay on this line") until the second promise is resolved, meaning we now have a JSON object
  const json = await response.json();
  console.log(json.results);
  createResultList(json.results);
}

window.onload = init;
