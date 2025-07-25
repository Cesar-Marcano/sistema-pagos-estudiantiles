import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { ParentService } from "../services/parent.service";
import { CreateParentController } from "../controllers/parent/createParent";
import { UpdateParentController } from "../controllers/parent/updateParent";

export const parentRouter = Router();

// services
const parentService = new ParentService(prisma);
const authService = new AuthService(prisma);

// controllers
const createParentController = new CreateParentController(
  parentService,
  authService
);
const updateParentController = new UpdateParentController(
  parentService,
  authService
);

// routes initialization
parentRouter.post("/", createParentController.build());
parentRouter.patch("/:id", updateParentController.build());
