import { Router } from "express";
import { loginController } from "../controllers/auth/login";

export const authRouter = Router();

authRouter.post('/login', loginController)
