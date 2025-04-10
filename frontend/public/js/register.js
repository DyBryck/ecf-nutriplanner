const activityLevelInput = document.querySelector("#activityLevelInput");
const activityLevelDisplay = document.querySelector("#activityLevelDisplay");

const levelDescriptions = {
  1: "1 - Peu ou pas d'exercice / sport",
  2: "2 - Exercice / sport 1 à 2 fois par semaine",
  3: "3 - Exercice / sport 3 à 5 fois par semaine",
  4: "4 - Exercice / sport 6 à 7 fois par semaine",
  5: "5 - Exercice / sport 6 à 7 fois par semaine & travail physique",
};

activityLevelInput.addEventListener("input", () => {
  const value = parseInt(activityLevelInput.value);
  activityLevelDisplay.textContent = levelDescriptions[value] || "Valeur inconnue";
});

const form = document.querySelector("#registerForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("http://localhost:4000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.error) {
    alert(result.error);
    return;
  } else {
    alert("Inscription réussie, vous allez être redirigé vers la page de connexion");
    window.location.href = "/login";
    return;
  }
});
