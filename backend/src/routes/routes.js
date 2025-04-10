import express from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express.Router();

router.post("/register", handleRequest(userController.createUser));
router.post("/login", handleRequest(authController.loginUser));
router.put("/users/:id", handleRequest(userController.updateUser));
router.get("/users/:id", handleRequest(userController.getUserById));

export default router;
