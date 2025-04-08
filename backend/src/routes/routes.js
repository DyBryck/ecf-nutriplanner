import express from "express";
import * as userController from "../controllers/userController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/users", handleRequest(userController.getAllUsers));
=======
router.post("/register", handleRequest(userController.createUser));
>>>>>>> 099f4a1 (feat(register route): controller, service, repository, tests, validators)

export default router;
