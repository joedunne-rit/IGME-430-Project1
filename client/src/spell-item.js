const item = document.createElement('template');
item.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="">
        <span id="spell-name" class="">spellName</span>
        <button id="remove" class="button">X</button>
    </div>
`

class spellItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(result.content.cloneNode(true));
    };

    connnectedCallback() {
        this.shadowRoot.querySelector("#spell-name").innerHTML = this.dataset.spellName;

        this.removeBtn = this.shadowRoot.querySelector("#remove");

        this.callback = this.callback || ((obj) => console.log(`${obj}`));

        this.removeBtn.onClick = () => {
            //Destroy this element
        }
    }

    disconnectedCallback() {
        this.removeBtn.onClick = null;
    }
}
customElements.define('spell-item', spellItem);

export function createSpell(spellName) {
    const newSpell = document.createElement('spell-item');
    newSpell.dataset.spellName = spellName;
    return newSpell;
}