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
  updateBtn.disabled = true;
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
    showCalories(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const showCalories = (data) => {
  const container = document.querySelector("#caloriesContainer");
  const calories = document.createElement("p");
  calories.textContent = `Total Calories: ${data.user.calories_needed}`;
  const proteins = document.createElement("p");
  proteins.textContent = `Protéines: ${data.user.proteins_needed}g`;
  const carbs = document.createElement("p");
  carbs.textContent = `Glucides: ${data.user.carbohydrates_needed}g`;
  const fats = document.createElement("p");
  fats.textContent = `Lipides: ${data.user.fats_needed}g`;
  container.append(calories, proteins, carbs, fats);
};

if (id) {
  getUserProfile();
}

const createPlanBtn = document.querySelector("#createPlanBtn");
const modal = document.querySelector("#modalBackground");

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const mealMoments = ["Petit-déjeuner", "Déjeuner", "Collation", "Dîner"]; // meal: 1 → 4

createPlanBtn.addEventListener("click", async () => {
  const response = await fetch(`http://localhost:4000/api/get-weekly-plan?user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const weekPlan = data.weekPlan;

  const planContainer = document.getElementById("modal");
  planContainer.innerHTML = ""; // Nettoyage

  // Regroupement des repas par jour
  const mealsByDay = {};

  weekPlan.forEach((meal) => {
    if (!mealsByDay[meal.day]) {
      mealsByDay[meal.day] = [];
    }
    mealsByDay[meal.day].push(meal);
  });

  for (let day = 1; day <= 7; day++) {
    const dayName = daysOfWeek[day - 1];
    const dayLi = document.createElement("li");
    dayLi.textContent = dayName;

    const innerUl = document.createElement("ul");

    const meals = mealsByDay[day] || [];
    meals.sort((a, b) => a.meal - b.meal); // Assure l'ordre des moments

    meals.forEach((meal) => {
      const mealLi = document.createElement("li");
      mealLi.textContent = `${mealMoments[meal.meal - 1]} : ${meal.recipe}`;

      // Liste des aliments
      const foodUl = document.createElement("ul");
      meal.food.forEach((item) => {
        const foodLi = document.createElement("li");
        foodLi.textContent = `${item.name} — ${item.grams}g`;
        foodUl.appendChild(foodLi);
      });

      mealLi.appendChild(foodUl);
      innerUl.appendChild(mealLi);
    });

    dayLi.appendChild(innerUl);
    planContainer.appendChild(dayLi);
  }

  modal.style.display = "flex"; // Affichage du modal
});
