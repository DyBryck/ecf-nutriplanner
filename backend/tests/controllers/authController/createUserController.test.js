import { createUser } from "../../../src/controllers/userController.js";
import * as userService from "../../../src/services/userService.js";
import * as userValidator from "../../../src/validators/userValidator.js";

vi.mock("../../../src/services/userService.js");
vi.mock("../../../src/validators/userValidator.js");

describe("Controller createUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait créer un utilisateur avec succès", async () => {
    // Simuler la requête avec un corps valide
    const req = {
      body: { username: "john", email: "john@example.com" },
    };

    // Simuler la réponse
    const validUser = { username: "john", email: "john@example.com" };

    // Simuler la fonction validateUser pour qu'elle retourne validUser
    const validateUserSpy = vi.spyOn(userValidator, "validateUser").mockReturnValue(validUser);

    // Données utilisateur créé que renverra le service
    const createdUser = { id: 1, username: "john", email: "john@example.com" };

    // Simuler la création de l’utilisateur dans le service
    const createUserSpy = vi.spyOn(userService, "createUser").mockResolvedValue(createdUser);

    // Appel de la fonction du controller
    const result = await createUser(req);

    // Vérifier que validateUser est appelé avec le bon contenu et la bonne méthode
    expect(validateUserSpy).toHaveBeenCalledWith(req.body, "post");

    // Vérifier que le service de création d’utilisateur est appelé avec l’utilisateur validé
    expect(createUserSpy).toHaveBeenCalledWith(validUser);

    // Vérifier que le résultat est celui attendu
    expect(result).toEqual({
      message: "Utilisateur crée avec succès",
      user: createdUser,
    });
  });
});
