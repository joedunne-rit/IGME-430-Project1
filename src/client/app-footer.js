"use strict";
//footer template
const footer = document.createElement("template");
footer.innerHTML= `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <footer class="has-background-white p-3">
        Contact: jmd1494@rit.edu<br>
        D&D Spellbook <slot></slot>
    </footer>
`;

//Slot element using footer template
class AppFooter extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(footer.content.cloneNode(true));
    }
}
customElements.define('app-footer', AppFooter);