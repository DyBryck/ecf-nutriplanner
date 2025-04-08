vi.mock("@prisma/client", () => {
  // On définit une implémentation simulée pour la méthode "users.create"
  const usersCreate = vi.fn();
  // Simuler le constructeur PrismaClient : chaque appel retourne un objet avec { users: { create } }
  const PrismaClient = vi.fn().mockImplementation(() => ({
    users: {
      create: usersCreate,
    },
  }));
  return { PrismaClient };
});

vi.mock("../../../src/errors/handlePrismaErrors.js", () => ({
  // On simule le gestionnaire d'erreurs qui exécute immédiatement la fonction passée
  default: vi.fn((fn) => fn()),
}));

import { beforeEach, describe, expect, it, vi } from "vitest";

// Variables pour stocker les références qui seront importées dynamiquement
let createUser; // La fonction à tester
let PrismaClient; // Le constructeur PrismaClient mocké
let prismaInstance; // Instance retournée par new PrismaClient()
let errorHandlerMock; // Le mock du gestionnaire d'erreurs

const mockData = { email: "test@example.com", password: "hashed123" };

describe("userRepository - createUser", () => {
  beforeEach(async () => {
    // Réinitialiser le cache des modules et vider les mocks AVANT d'importer les modules dépendants
    vi.resetModules();
    vi.clearAllMocks();

    // Import dynamique de Prisma et récupération du constructeur mocké
    const prismaModule = await import("@prisma/client");
    PrismaClient = prismaModule.PrismaClient;

    // Import dynamique du repository qui, à son import, crée une instance via "new PrismaClient()"
    const userRepositoryModule = await import("../../../src/repositories/userRepository.js");
    createUser = userRepositoryModule.createUser;

    // Récupérer l'instance retournée par le constructeur.
    // La propriété "mock.results[0].value" contient l'objet renvoyé par le premier appel à "new PrismaClient()".
    prismaInstance = PrismaClient.mock.results[0].value;

    // Import dynamique du gestionnaire d'erreurs pour pouvoir vérifier ses appels
    const errorHandlerModule = await import("../../../src/errors/handlePrismaErrors.js");
    errorHandlerMock = errorHandlerModule.default;
  });

  it("devrait appeler prisma.users.create avec les bonnes données", async () => {
    const mockCreatedUser = { id: 1, ...mockData };

    // Vérification que l'instance a été créée correctement
    expect(prismaInstance).toBeDefined();

    // Configurer la méthode "create" pour qu'elle renvoie la valeur simulée
    prismaInstance.users.create.mockResolvedValue(mockCreatedUser);

    const result = await createUser(mockData);

    expect(prismaInstance.users.create).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockCreatedUser);
  });

  it("devrait passer l’appel Prisma dans prismaErrorHandler", async () => {
    // Réinitialiser l'historique du mock du gestionnaire d'erreurs
    errorHandlerMock.mockClear();

    // S'assurer que "users.create" renvoie une valeur pour que le callback soit invoqué
    prismaInstance.users.create.mockResolvedValue({ id: 1, ...mockData });

    await createUser(mockData);

    // Vérifier que le gestionnaire d'erreurs a bien été appelé
    expect(errorHandlerMock).toHaveBeenCalled();

    // Optionnel : vérifier que le premier argument passé est bien une fonction (le callback)
    const firstArg = errorHandlerMock.mock.calls[0][0];
    expect(typeof firstArg).toBe("function");
  });
});
