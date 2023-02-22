"use strict";
import * as storage from "./storage.js";


//Result card template
const result = document.createElement("template");
result.innerHTML= `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <style>
    .card {
        height: 300px;
        overflow: auto;
    }
    </style>
    <div class="card">
        <div class="card-header mb-3">
            <span class="card-header-title" id="name">Spell name</span>
            <button class="button m-2" id="favorite">Favorite</button>
        </div>
        <span class="ml-3" id="level">Level #</span>
        <span class="ml-1" id="school">Spell school</span>
        <span class="ml-4">Casting time: <span id="cast-time">Cast time</span></span>
        <span class="ml-4">Duration: <span id="duration">Duration</span></span><br>
        <span class="ml-3">Components: <span id="components"></span></span>
        <span class="ml-5">Range: <span id="range">Range</span></span>
        <span class="ml-5">Ritual: <span id="ritual">??</span></span>
        <span class="ml-5">Concentration: <span id="concentration">??</span></span>
        <div class="card-content">
            <div class="mb-2" id="description">Spell description</div>
            <div class="mb-4" id="high-level-intro">At higher level: <span id="higher-level">higher level description</span></div>
            <div id="material-intro">Required material: <span id="material">material</span></div>
            <div>Classes that can use spell: <span id="classes">class list</span></div>
        </div>
    </div>
`

//Component used for displaying a search result
//Contains a favorite button to add spell to favorites list
class SearchResult extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(result.content.cloneNode(true));
    }

    connectedCallback(){
        //Find some way to shorten this code? Feels unessecarily lengthy
        this.shadowRoot.querySelector("#name").innerHTML = this.dataset.name;
        this.shadowRoot.querySelector("#school").innerHTML = this.dataset.school;
        this.shadowRoot.querySelector("#level").innerHTML = this.dataset.level;
        this.shadowRoot.querySelector("#cast-time").innerHTML = this.dataset.castTime;
        this.shadowRoot.querySelector("#duration").innerHTML = this.dataset.duration;
        this.shadowRoot.querySelector("#components").innerHTML = this.dataset.components;
        this.shadowRoot.querySelector("#range").innerHTML = this.dataset.range;
        this.shadowRoot.querySelector("#ritual").innerHTML = this.dataset.ritual;
        this.shadowRoot.querySelector("#concentration").innerHTML = this.dataset.concentration;
        this.shadowRoot.querySelector("#description").innerHTML = this.dataset.description;
        this.shadowRoot.querySelector("#higher-level").innerHTML = this.dataset.higherLevel;
        if(this.dataset.higherLevel == ""){
            this.shadowRoot.querySelector("#high-level-intro").innerHTML = "";
        }
        this.shadowRoot.querySelector("#material").innerHTML = this.dataset.material;
        if(this.dataset.material == ""){
            this.shadowRoot.querySelector("#material-intro").innerHTML = "";
        }
        this.shadowRoot.querySelector("#classes").innerHTML = this.dataset.classes;

        //If spell is already in favorites, black out favoite button
        this.favoriteBtn = this.shadowRoot.querySelector("#favorite");
        const favoritesList = storage.getFavorites();
        for (let spell of favoritesList){
            if (spell == this.dataset.name.toLowerCase()){
                this.favoriteBtn.setAttribute("class", "button m-2 is-dark")
                this.favoriteBtn.innerHTML = "Favorited"
            }
        }

        this.callback = this.callback || ((obj) => console.log(`${obj}`));

        //When favorite is clicked, add to local storage favorites and increases faves by 1 on database
        //Does not do anything if already on favorites
        this.favoriteBtn.onclick = () => {
            if (!storage.checkFavorites(this.dataset.name.toLowerCase())){
                storage.addFavorite(this.dataset.name.toLowerCase());
                this.favoriteBtn.setAttribute("class", "button m-2 is-dark")
                this.favoriteBtn.innerHTML = "Favorited"
                const name = this.dataset.name;
                this.callback(name);
            }
            else { console.log(`${this.dataset.name} already added to favorites`); }
        }
    }

    disconnectedCallback(){
        this.favoriteBtn.onclick = null;
    }
}
customElements.define('search-result',SearchResult);

//Create a single card result using json object
export function createResult(spell){
    //Creates a result with info provided (lengthy)
    const newResult = document.createElement("search-result");
    newResult.dataset.name = spell.name;
    newResult.dataset.school = spell.school;
    newResult.dataset.level = spell.level;
    newResult.dataset.castTime = spell.casting_time;
    newResult.dataset.duration = spell.duration;
    newResult.dataset.components = spell.components;
    newResult.dataset.range = spell.range;
    newResult.dataset.ritual = spell.ritual;
    newResult.dataset.concentration = spell.concentration;
    newResult.dataset.description = spell.desc;
    newResult.dataset.higherLevel = spell.higher_level;
    newResult.dataset.material = spell.material;
    newResult.dataset.classes = spell.dnd_class;
    return newResult;
}