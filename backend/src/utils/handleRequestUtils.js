<<<<<<< HEAD
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
=======
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors/customErrors.js";
>>>>>>> 099f4a1 (feat(register route): controller, service, repository, tests, validators)

// Codes de succès par défaut pour chaque méthode HTTP
const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

/**
 *
 * @param {*} callback - Fonction du controller
 * @returns - Réponse d'erreur ou de succès avec le code approprié
 * @description - Gère les requêtes et les erreurs
 */
export const handleRequest = (callback) => async (req, res) => {
  try {
    // Appelle la fonction de callback
    const data = await callback(req, res);

    // Définit le code de succès par défaut en fonction de la méthode HTTP
    const code = defaultSuccessCodes[req.method] || 200;

    // Retourne la réponse avec le code de succès et les données
    return res.status(code).json(data);
  } catch (error) {
    // appendLog(`Erreur rencontrée: ${error}`);

    // Définit le code d'erreur en fonction du type d'erreur
    let statusCode;
<<<<<<< HEAD
    if (error instanceof BadRequestError) {
=======
    if (error instanceof BadRequestError || error instanceof ValidationError) {
>>>>>>> 099f4a1 (feat(register route): controller, service, repository, tests, validators)
      statusCode = 400;
    } else if (error instanceof UnauthorizedError) {
      statusCode = 401;
    } else if (error instanceof NotFoundError) {
      statusCode = 404;
    } else {
      statusCode = 500;
    }

    // retourne la réponse avec le code d'erreur et le message d'erreur
    return res.status(statusCode).json({ error: error.message });
  }
};
