import { Router } from "express";

import { RegisterController } from "../controllers/auth/register";
import { prisma } from "../prisma";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { LoginController } from "../controllers/auth/login";
import { AccessTokenController } from "../controllers/auth/accessToken";

export const authRouter = Router();

// services
const userService = new UserService(prisma);
const authService = new AuthService();

// controllers
const registerController = new RegisterController(userService, authService);
const loginController = new LoginController(userService, authService);
const accessTokenController = new AccessTokenController(authService);

// routes initialization
authRouter.post("/register", registerController.build());
authRouter.post("/login", loginController.build());
authRouter.post("/access", accessTokenController.build());
