import * as userRepository from "../../../src/repositories/userRepository.js";
import { createUser } from "../../../src/services/userService.js";
import * as passwordUtils from "../../../src/utils/passwordUtils.js";

vi.mock("../../../src/repositories/userRepository.js");
vi.mock("../../../src/utils/passwordUtils.js");

describe("Service createUser", () => {
  const mockData = {
    email: "john@example.com",
    password: "plaintext123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("doit hasher le mot de passe et créer un utilisateur", async () => {
    const hashedPassword = "hashedPassword123";
    const mockUser = { id: 1, email: mockData.email };

    passwordUtils.hashPassword.mockResolvedValue(hashedPassword);
    userRepository.createUser.mockResolvedValue(mockUser);

    const result = await createUser(mockData);

    expect(passwordUtils.hashPassword).toHaveBeenCalledWith(mockData.password);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      email: mockData.email,
      password: hashedPassword,
    });
    expect(result).toEqual(mockUser);
  });

  it("doit lancer une erreur si la création échoue", async () => {
    passwordUtils.hashPassword.mockResolvedValue("hashedPassword123");
    userRepository.createUser.mockResolvedValue(null);

    await expect(createUser(mockData)).rejects.toThrow(
      "Erreur lors de la création de l'utilisateur",
    );
  });
});
