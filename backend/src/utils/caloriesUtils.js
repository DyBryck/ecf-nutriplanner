export const calculateCaloriesNeeded = (weight, body_fat, activity_level) => {
  const activityMultiplier = {
    1: 1.15,
    2: 1.25,
    3: 1.4,
    4: 1.55,
    5: 1.7,
  };

  const calories = Math.round(
    (370 + 21.6 * (1 - body_fat / 100) * weight) * activityMultiplier[activity_level],
  );

  const proteinsGrams = Math.round(1.9 * (1 - body_fat / 100) * weight);
  const proteinsCalories = Math.round(proteinsGrams * 4);
  const proteins = {
    grams: proteinsGrams,
    calories: proteinsCalories,
  };

  const fatsGrams = Math.round(1 * (1 - body_fat / 100) * weight);
  const fatsCalories = Math.round(fatsGrams * 9);
  const fats = {
    grams: fatsGrams,
    calories: fatsCalories,
  };

  const carbohydratesGrams = Math.round((calories - proteinsCalories - fatsCalories) / 4);
  const carbohydratesCalories = Math.round(carbohydratesGrams * 4);
  const carbohydrates = {
    grams: carbohydratesGrams,
    calories: carbohydratesCalories,
  };

  const macrosRatio = {
    proteins: Math.round((proteinsCalories / calories) * 100),
    fats: Math.round((fatsCalories / calories) * 100),
    carbohydrates: Math.round((carbohydratesCalories / calories) * 100),
  };

  return { calories, proteins, carbohydrates, fats, macrosRatio };
};

const { default: solver } = await import("javascript-lp-solver");

/**
 * Optimise un repas.
 *
 * @param {Array} recipe - Liste des ingrédients (name, p, c, l, min)
 * @param {Object} target - Objectifs nutritionnels { protein, carb, lipid }
 * @returns {Object} Résultat structuré
 */
export const optimizeRecipe = (recipe, target) => {
  const model = {
    optimize: "obj",
    opType: "min",
    constraints: {
      protBalance: { equal: target.protein },
      carbBalance: { equal: target.carb },
      lipBalance: { equal: target.lipid },
    },
    variables: {},
  };

  recipe.forEach((item) => {
    const varDef = {
      protBalance: item.p,
      carbBalance: item.c,
      lipBalance: item.l,
      obj: 0,
    };

    if (item.min !== undefined) {
      const constraintName = `min_${item.name}`;
      varDef[constraintName] = 1;
      model.constraints[constraintName] = { min: item.min };
    }

    model.variables[item.name] = varDef;
  });

  const nutrients = [
    { name: "prot", constraint: "protBalance" },
    { name: "carb", constraint: "carbBalance" },
    { name: "lip", constraint: "lipBalance" },
  ];

  nutrients.forEach(({ name, constraint }) => {
    model.variables[`dev_${name}_pos`] = { [constraint]: -1, obj: 1 };
    model.variables[`dev_${name}_neg`] = { [constraint]: 1, obj: 1 };
  });

  const result = solver.Solve(model);

  if (!result.feasible) {
    return {
      success: false,
      message: "Aucune solution réalisable avec les ingrédients et contraintes fournies.",
    };
  }

  const ingredientsUsed = recipe.reduce((acc, item) => {
    const quantity = result[item.name];
    if (quantity > 0) {
      acc.push({
        name: item.name,
        grams: Math.round(quantity * 100) / 100,
        id: item.id,
      });
    }
    return acc;
  }, []);

  const delta = (pos, neg) => Math.round(((result[pos] || 0) - (result[neg] || 0)) * 10) / 10;

  const deviationsReport = {
    protein: delta("dev_prot_pos", "dev_prot_neg"),
    carb: delta("dev_carb_pos", "dev_carb_neg"),
    lipid: delta("dev_lip_pos", "dev_lip_neg"),
  };

  let message = `Objectif atteint avec ${ingredientsUsed
    .map((i) => `${Math.round(i.grams)}g de ${i.name}`)
    .join(" et ")}.`;

  const deviationsMsg = Object.entries(deviationsReport)
    .filter(([, value]) => value !== 0)
    .map(
      ([nutrient, value]) =>
        `${value > 0 ? "Excès" : "Manque"} de ${Math.abs(value)}g de ${nutrient}.`,
    );

  if (deviationsMsg.length > 0) {
    message += " " + deviationsMsg.join(" ");
  }

  return {
    success: true,
    ingredients: ingredientsUsed,
    deviations: deviationsReport,
    message,
  };
};

// const recipe = [
//   { name: "Riz", p: 0.027, c: 0.77, l: 0.003, min: 50 },
//   { name: "Poulet", p: 0.202, c: 0.003, l: 0.101, min: 120 },
//   { name: "PetitsPois", p: 0.0327, c: 0.0705, l: 0.0023, min: 60 },
//   // Ajoutez d'autres ingrédients si nécessaire
// ];

// const target = { protein: 30, carb: 60, lipid: 16 };

// const result = optimizeRecipe(recipe, target);
