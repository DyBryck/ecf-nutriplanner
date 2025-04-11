import fs from "fs/promises";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Répertoire racine pour les fichiers statiques
const publicDir = path.join(__dirname, "public");

// Mapping des routes personnalisées
const routes = {
  "/": "index.html",
  "/home": "index.html",
  "/about": "about.html",
  "/register": "register.html",
  "/login": "login.html",
  "/profile": "profile.html",
};

/**
 * Renvoie le type de contenu (MIME type) en fonction de l'extension du fichier
 * @param {string} filePath - Le chemin du fichier demandé
 * @returns {string} - Le type de contenu approprié
 */
function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return mimeTypes[extension] || "application/octet-stream";
}

/**
 * Résout le chemin du fichier demandé en fonction de l'URL et des routes personnalisées.
 * @param {string} urlPath - L'URL de la requête
 * @returns {string} - Le chemin complet vers le fichier à servir
 */
function resolveFilePath(urlPath) {
  // Retire d'éventuels paramètres de la chaîne de requête
  const cleanedPath = urlPath.split("?")[0];

  // Vérification si l'URL correspond à une route personnalisée
  if (routes[cleanedPath]) {
    const fileName = routes[cleanedPath];
    // Si la racine est demandée ("/"), le fichier se trouve directement dans publicDir
    // Sinon, le fichier est dans le sous-dossier "pages"
    const baseDir =
      cleanedPath === "/home" || cleanedPath === "/" ? publicDir : path.join(publicDir, "pages");
    return path.join(baseDir, fileName);
  }
  // Pour les autres chemins, on considère qu'il s'agit d'un chemin relatif à publicDir
  return path.join(publicDir, cleanedPath);
}

// Création du serveur HTTP
const server = http.createServer(async (req, res) => {
  try {
    // Résolution du chemin du fichier à servir
    const filePath = resolveFilePath(req.url);

    // Vérification de sécurité pour éviter l'accès à des fichiers en dehors du répertoire publicDir
    if (!filePath.startsWith(publicDir)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Accès interdit");
      return;
    }

    // Lecture du contenu du fichier
    const fileContent = await fs.readFile(filePath);
    const contentType = getContentType(filePath);

    // Envoi de la réponse avec le contenu et le type MIME approprié
    res.writeHead(200, { "Content-Type": contentType });
    res.end(fileContent);
  } catch (error) {
    // Gestion de l'erreur "fichier non trouvé"
    if (error.code === "ENOENT") {
      try {
        // Tentative de servir une page 404 personnalisée
        const notFoundPath = path.join(publicDir, "pages", "404.html");
        const notFoundContent = await fs.readFile(notFoundPath, "utf8");
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(notFoundContent);
      } catch {
        // Message de secours si la page 404 personnalisée n'est pas disponible
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page non trouvée</h1>");
      }
    } else {
      // Pour toute autre erreur, on renvoie un message d'erreur serveur
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Erreur serveur</h1>");
    }
  }
});

// Démarrage du serveur sur le port défini
server.listen(PORT, () => {
  console.log(`Serveur frontend lancé sur le port http://localhost:${PORT}`);
});
