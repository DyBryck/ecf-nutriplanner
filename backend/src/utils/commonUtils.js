/**
 * Renvoie un entier aléatoire entre 1 et max (inclus)
 * @param {number} max - Le nombre maximal (doit être ≥ 1)
 * @returns {number} Un entier entre 1 et max
 */
export const getRandomInt = (max) => {
  if (!Number.isInteger(max) || max < 1) {
    throw new Error("Le paramètre 'max' doit être un entier supérieur ou égal à 1.");
  }

  return Math.floor(Math.random() * max) + 1;
};
