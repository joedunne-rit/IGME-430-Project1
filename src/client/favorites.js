"use strict";
import * as storage from "./storage.js";
import * as spellResult from "./search-result.js";
import * as firebase from "./firebase.js";

const favoritesList = document.querySelector("#favorites-list");
const topList = document.querySelector("#community-favorites");
const ButtonClearFavorites = document.querySelector("#btn-wipe-faves")
const urlBase = "https://api.open5e.com/spells/?name__iexact=";

ButtonClearFavorites.onclick = clearFavorites;

//Load and display favorites on page
function loadFavorites(){
    let favorites = storage.getFavorites();
    console.log(favorites);
    for(let spell of favorites)
    {
        ///appendChild is not functioning for some reason
        ///Note: commented code was used while favoritesList was a div
        let url = urlBase + spell;
        loadJsonFetch(url, 0);
        //favoritesList.innerHTML += `<li>${spell}</li>`;
    }
    if (favorites.length == 0){
        favoritesList.innerHTML = `No favorites`;
    }
}

//Load and display favorites with highest fave counts on database
function loadTopFavorites(topFaves){
    for(let spell of topFaves){
        let url = urlBase + spell.name;
        loadJsonFetch(url);
    }
}

//Removes a user's favorites info when clear faves is clicked
function clearFavorites(){
    //Remove favorite increments from firebase first
    let favorites = storage.getFavorites();
    for (let spell of favorites){
        firebase.removeFaveData(spell);
    }
    //Clear favorites and update interface
    storage.clearFavorites();
    favoritesList.innerHTML = '';
    console.log("favorites cleared");
    favoritesList.innerHTML = `No favorites`;
}

//adds spell to favorites, increases total favorites in database by 1
const addFavorite = (spellObj) => {
    console.log(spellObj);
    firebase.writeFaveData(spellObj);
}

//fetches json from api, returns card component using spell obtained
//'type' indicates which element to place card component in
async function loadJsonFetch(url, type){
    // await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
    // note: default limit for open5e is 50 results unless otherwise specified
    let response = await fetch(url);

    // await ("stay on this line") until the second promise is resolved, meaning we now have a JSON object
    let json = await response.json();
    if (type == 0){
        let newCard = spellResult.createResult(json.results[0]);
        newCard.callback = addFavorite;
        favoritesList.appendChild(newCard);
    }
    else{
        let newCard = spellResult.createResult(json.results[0]);
        newCard.callback = addFavorite;
        topList.appendChild(newCard);
    }
}

loadFavorites();
firebase.topThree(loadTopFavorites);