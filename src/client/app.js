import * as storage from "./storage.js";
import * as spellResult from "./search-result.js";
import * as firebase from "./firebase.js";

const searchBar = document.querySelector('#search-bar');
const dndclass = document.querySelector('#class');
const school = document.querySelector('#school');
const level = document.querySelector('#level');
const concentration = document.querySelector('#concentration');
const ritual = document.querySelector('#ritual');
const limit = document.querySelector('#result-limit');
const searchButton = document.querySelector('#btn-search');
const clearButton = document.querySelector('#btn-clear');
const results = document.querySelector('#element-card-holder');
const status = document.querySelector('#element-status');

//Assigns functions to buttons
searchButton.onclick = searcher;
clearButton.onclick = clear;

let storedSettings = storage.getSettings();
searchBar.value = storedSettings.spellName;
dndclass.value = storedSettings.class;
school.value = storedSettings.school;
level.value = storedSettings.level;
concentration.checked = storedSettings.concentration;
ritual.checked = storedSettings.ritual;
limit.value = storedSettings.limit;
searcher();

//Executes search when search button is clicked
function searcher(){
    status.innerHTML = 'Searching...';
    let urlBase = "https://api.open5e.com/spells";
    loadJsonFetch(constructURL(urlBase));
    console.log("search clicked");
    let settings = {
        spellName : searchBar.value,
        class : dndclass.value,
        school : school.value,
        level : level.value,
        concentration : concentration.checked,
        ritual : ritual.checked,
        limit : limit.value
    }
    storage.storeSettings(settings);
}

//Clears results when clear button is clicked
function clear(){
    results.innerHTML = '';
    status.innerHTML = 'Results cleared';
}

//Constructs a url based on input
//Values to do: range, components, duration, casting time
function constructURL(urlBase){
    let url = urlBase + `/?search=${searchBar.value}`;
    if (dndclass.value != '--'){
        url += `&dnd_class=${dndclass.value}`;
    }
    if (school.value != '--'){
        url += `&school=${school.value}`;
    }
    if (level.value != '--'){
        if (level.value == "Cantrip")
        {url += `&level_int__iexact=0`}
        else{url += `&level_int__iexact=${level.value}`;}
    }
    if(concentration.checked){
        url += `&concentration=yes`;
    }
    url += `&limit=${limit.value}`;
    console.log(url);
    return url;
}

//Adds spell to favorites, increases total favorites in database by 1
const addFavorite = (spellObj) => {
    console.log(spellObj);
    firebase.writeFaveData(spellObj);
}

//Creates a list of results to display
function createResultList(array){
    results.innerHTML = '';
    //If there are no results, says so
    if (array.length == 0){
        status.innerHTML = "No results found";
        return;
    }
    for(let object of array){
        if (ritual.checked && object.ritual == "no"){
            //Skips the object if ritaul cast is specified and it can't be ritual casted
        }
        else{
            let newCard = spellResult.createResult(object);
            newCard.callback = addFavorite;
            results.appendChild(newCard);
        }
    }
    status.innerHTML = "Results found";
}

//fetches json from api
async function loadJsonFetch(url){
    // await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
    // note: default limit for open5e is 50 results unless otherwise specified
    let response = await fetch(url);

    // await ("stay on this line") until the second promise is resolved, meaning we now have a JSON object
    let json = await response.json();
    console.log(json.results);
    createResultList(json.results);
}