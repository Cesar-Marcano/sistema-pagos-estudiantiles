import { Router } from "express";

import { RegisterController } from "../controllers/auth/register";
import { prisma } from "../prisma";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { LoginController } from "../controllers/auth/login";
import { AccessTokenController } from "../controllers/auth/accessToken";
import { CreateSuperUserController } from "../controllers/auth/createSuperuser";
import { NeedsSuperUserController } from "../controllers/auth/needsSuperUser";

export const authRouter = Router();

// services
const userService = new UserService(prisma);
const authService = new AuthService();

// controllers
const registerController = new RegisterController(userService, authService);
const loginController = new LoginController(userService, authService);
const accessTokenController = new AccessTokenController(authService);
const createSuperUserController = new CreateSuperUserController(
  userService,
  authService
);
const needsSuperUser = new NeedsSuperUserController(userService);

// routes initialization
authRouter.post("/register", registerController.build());
authRouter.post("/login", loginController.build());
authRouter.post("/access", accessTokenController.build());
authRouter.post("/create-super-user", createSuperUserController.build());

authRouter.get("/needs-super-user", needsSuperUser.build());
