import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hache un mot de passe en utilisant bcrypt.
 *
 * @param {string} plainPassword - Le mot de passe en clair à hacher.
 * @returns {Promise<string>} - La promesse qui résout en le mot de passe haché.
 */
export const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe:", error);
    throw error;
  }
};

/**
 * Compare un mot de passe en clair avec un hash pour vérifier s'ils correspondent.
 *
 * @param {string} plainPassword - Le mot de passe en clair fourni.
 * @param {string} hashedPassword - Le hash stocké avec lequel comparer.
 * @returns {Promise<boolean>} - La promesse qui résout en un booléen indiquant si les mots de passe correspondent.
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Erreur lors de la comparaison du mot de passe:", error);
    throw error;
  }
};
