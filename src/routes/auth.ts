import { Router } from "express";
import { registerContrller } from "../controllers/auth/register";

export const authRouter = Router();

authRouter.post("/register", registerContrller);
