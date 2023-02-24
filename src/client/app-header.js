// header template
const header = document.createElement('template');
header.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"> 
    <style>
        font-family: 'Dancing Script', cursive;
    </style>
    <header class="hero is-danger">
        <h1 class="is-size-2 has-text-weight-bold pt-3 pl-3">D&D Spellbook Maker</h1>
        <h2 class="is-size-5 pl-3 pb-3"><slot></slot></h2>
    </header>
`;

// Slot element using header template
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(header.content.cloneNode(true));
  }
}
customElements.define('app-header', AppHeader);
