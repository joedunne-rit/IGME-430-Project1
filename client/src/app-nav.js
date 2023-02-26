// Navigation template
const appNav = document.createElement('template');
appNav.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <nav class="navbar has-shadow is-white">
        <div class="navbar-brand">
            <a class="navbar-item" href="home.html">
                <i class="fas fa-book"></i>
            </a>
            <a id="burger" class="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-start">
                <a id="home" class="navbar-item is-hoverable" href="home.html">Home</a>
                <a id="app" class="navbar-item is-hoverable" href="app.html">App</a>
                <a id="favorites" class="navbar-item is-hoverable" href="favorites.html">Favorites</a>
                <a id="documentation" class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
            </div>
        </div>
    </nav>
    `;

// Component that will serve as the app's navigation
// Current page will be in bold
class Navigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(appNav.content.cloneNode(true));

    this.burgerIcon = this.shadowRoot.querySelector('#burger');
    this.navbarMenu = this.shadowRoot.querySelector('#nav-links');

    this.burgerIcon.addEventListener('click', () => {
      this.navbarMenu.classList.toggle('is-active');
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const page = this.getAttribute('page');
    this.shadowRoot.querySelector(`#${page}`).setAttribute('class', 'navbar-item has-text-weight-bold');
  }
}
customElements.define('app-nav', Navigation);
