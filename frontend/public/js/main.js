class HeaderContent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<a href="/accueil">Accueil</a>`;
  }
}
customElements.define("header-content", HeaderContent);

class FooterContent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<p>&copy 2025 ECF 2, NutriPlanner. Tous droits réservés.</p>
                      <a href="/about">À propos</a>`;
  }
}
customElements.define("footer-content", FooterContent);

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-mode");
}
