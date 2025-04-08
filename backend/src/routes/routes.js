import express from "express";
import * as userController from "../controllers/userController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express.Router();

router.get("/users", handleRequest(userController.getAllUsers));

export default router;
