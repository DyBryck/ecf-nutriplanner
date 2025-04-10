const id = localStorage.getItem("user_id");
if (!id) {
  window.location.href = "/login";
}

const updateBtn = document.querySelector("#updateBtn");
const updateProfileBtn = document.querySelector("#updateProfile");
const updateProfileForm = document.querySelector("#updateProfileForm");
const inputs = document.querySelectorAll("input");

const updatePlaceholder = async () => {
  const response = await fetch(`http://localhost:4000/api/users/${id}`);
  const data = await response.json();

  inputs.forEach((input) => {
    const fieldName = input.name;

    if (fieldName && data.user[fieldName]) {
      if (fieldName === "password") {
        input.placeholder = "Mot de passe";
      } else {
        input.placeholder = data.user[fieldName];
      }
    }
  });
};

updateBtn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.disabled = false;
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    updateProfileBtn.disabled = false;
  });
});

updateProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(updateProfileForm);
  const body = Object.fromEntries(formData.entries());

  const response = await fetch(`http://localhost:4000/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
});

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

const getUserProfile = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/users/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du profil utilisateur");
    }
    const data = await response.json();
    updatePlaceholder();
    return data;
  } catch (error) {
    console.error(error);
  }
};

getUserProfile();
