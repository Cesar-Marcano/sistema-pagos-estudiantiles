import { Router } from "express";

import { registerContrller } from "../controllers/auth/register";
import { prisma } from "../prisma";
import { UserService } from "../services/user.service";

export const authRouter = Router();

const userService = new UserService(prisma);

authRouter.post("/register", registerContrller(userService));
