class HeaderContent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <a href="/home" class="logo">NutriPlanner</a>
    <ul>
      <li><a href="/home">Accueil</a></li>
      <li><a href="/meals">Recettes</a></li>
      <li><a href="/shopping-list">Mes courses</a></li>
      <li><a href="/profile">Mon profil</a></li>
    </ul>`;
  }
}
customElements.define("header-content", HeaderContent);

class FooterContent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <ul>
      <li><a href="/home">Accueil</a></li>
      <li><a href="/meals">Recettes</a></li>
      <li><a href="/shopping-list">Mes courses</a></li>
      <li><a href="/profile">Mon profil</a></li>
    </ul>
    <div>
      <p>Contact</p>
      <p>Tel: 01.23.45.67.89</p>
      <p>Email: contact@nutriplanner.com</p>
      <p>&copy 2025 ECF 2, NutriPlanner. Tous droits réservés.</p>
      <a href="/about">À propos</a>
    </div>`;
  }
}
customElements.define("footer-content", FooterContent);
