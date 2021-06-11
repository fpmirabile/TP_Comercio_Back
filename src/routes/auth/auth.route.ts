import express from "express";
import AuthService from "../../controller/auth/auth.controller";
import { validateLogin } from "../../middleware/auth";

const router = express.Router();
const authController = new AuthService();

router.post(
  "/login",
  validateLogin,
  authController.login
);

router.post('/register', authController.register);

export default router;
