import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { ParentService } from "../services/parent.service";
import { CreateParentController } from "../controllers/parent/createParent";

export const parentRouter = Router();

// services
const parentService = new ParentService(prisma);
const authService = new AuthService(prisma);

// controllers
const createParentController = new CreateParentController(
  parentService,
  authService
);

// routes initialization
parentRouter.post("/", createParentController.build());
