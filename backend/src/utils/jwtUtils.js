import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

/**
 * Génère un token d'accès JWT.
 *
 * @param {Object} payload - Les données à inclure dans le token (par exemple, l'identifiant de l'utilisateur).
 * @returns {string} Le token d'accès généré.
 */
export const signAccessToken = (payload) => {
  const signOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, signOptions);
};

/**
 * Génère un token de refresh JWT.
 *
 * @param {Object} payload - Les données à inclure dans le token.
 * @returns {string} Le token de refresh généré.
 */
export const signRefreshToken = (payload) => {
  const signOptions = { expiresIn: REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, signOptions);
};

/**
 * Vérifie la validité d'un token.
 *
 * @param {string} token - Le token JWT à vérifier.
 * @returns {Object} Le payload décodé si le token est valide.
 * @throws {Error} En cas de token invalide ou expiré.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
