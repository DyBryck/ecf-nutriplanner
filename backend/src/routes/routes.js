import express from "express";
import * as userController from "../controllers/userController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express.Router();

router.post("/register", handleRequest(userController.createUser));

export default router;
