import { Router } from "express";

import { registerContrller } from "../controllers/auth/register";
import { prisma } from "../prisma";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

export const authRouter = Router();

// services
const userService = new UserService(prisma);
const authService = new AuthService();

// routes initialization
authRouter.post("/register", registerContrller(userService, authService));
