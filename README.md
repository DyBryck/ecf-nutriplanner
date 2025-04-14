## Table des matières

- [Structure](#structure)
- [Installation](#installation)

---

## Structure

```
├── .github/
│   └── workflows/
├── .husky/
├── backend/
│   ├── prisma/
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── errors/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   └── tests/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   ├── images/
│   │   ├── css/
│   │   ├── js/
│   │   ├── pages/
│   │   ├── index.html
│   └── server.js
```

---

## Installation

### Prérequis

![](https://img.shields.io/badge/Node.js-v22.14.0-5FA04E?logo=nodedotjs) ![](https://img.shields.io/badge/pnpm-v10.7.1-F69220?logo=pnpm)

- [Node.js](https://nodejs.org/en) v22
- [pnpm](https://pnpm.io/) recommandé

### Étapes d'installation

Clonez le dépôt GitHub puis installez les dépendances :

```bash
git clone git@github.com:DyBryck/ecf-nutriplanner.git
cd ecf-nutriplanner
pnpm i
```

### Démarrer l'application

Pour démarrer le projet en mode développement:

```
pnpm dev
```

Pour peupler la base de données:

```
pnpm seed
```

### Tests

Exécutez les tests via :

```bash
pnpm test
```
