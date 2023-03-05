import * as app from './app.js';

//Spell item template
const item = document.createElement('template');
item.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="">
        <span id="spell-name" class="">spellName</span>
        <button id="remove" class="button">X</button>
    </div>
`

//Component used as part of spell list creator
//Displays spell name & a button to remove it from the list
class spellItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(item.content.cloneNode(true));
    };

    connectedCallback() {
        this.shadowRoot.querySelector("#spell-name").innerHTML = this.dataset.spellName;

        this.removeBtn = this.shadowRoot.querySelector("#remove");

        //this.callback = this.callback || ((obj) => console.log(`${obj}`));

        this.removeBtn.onclick = () => {
            app.removeItem(this.dataset.spellName);
            this.remove();
        }
    }

    disconnectedCallback() {
        this.removeBtn.onClick = null;
    }
}
customElements.define('spell-item', spellItem);

export function createSpell(name) {
    const newSpell = document.createElement('spell-item');
    newSpell.dataset.spellName = name;
    return newSpell;
}