import { Router } from "express";

import { RegisterController } from "../controllers/auth/register";
import { prisma } from "../app/instances/prisma";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { LoginController } from "../controllers/auth/login";
import { AccessTokenController } from "../controllers/auth/accessToken";
import { CreateSuperUserController } from "../controllers/auth/createSuperuser";
import { NeedsSuperUserController } from "../controllers/auth/needsSuperUser";
import { LogoutController } from "../controllers/auth/logout";
import { GetUserSessionsController } from "../controllers/auth/getUserSessions";
import { CloseSessionController } from "../controllers/auth/closeSession";
import { AuditLogsService } from "../services/auditLogs.service";

export const authRouter = Router();

// services
const auditLogsService = new AuditLogsService(prisma);

const userService = new UserService(prisma, auditLogsService);
const authService = new AuthService(prisma);

// controllers
const registerController = new RegisterController(userService, authService);
const loginController = new LoginController(userService, authService);
const accessTokenController = new AccessTokenController(authService);
const createSuperUserController = new CreateSuperUserController(
  userService,
  authService
);
const needsSuperUser = new NeedsSuperUserController(userService);
const logoutController = new LogoutController(authService);
const getUserSessionsController = new GetUserSessionsController(authService);
const closeSessionController = new CloseSessionController(authService);

// routes initialization
authRouter.post("/register", registerController.build());
authRouter.post("/login", loginController.build());
authRouter.post("/access", accessTokenController.build());
authRouter.post("/create-super-user", createSuperUserController.build());
authRouter.post("/logout", logoutController.build());

authRouter.get("/needs-super-user", needsSuperUser.build());
authRouter.get("/active-sessions", getUserSessionsController.build());

authRouter.delete("/close-session/:sessionId", closeSessionController.build());
