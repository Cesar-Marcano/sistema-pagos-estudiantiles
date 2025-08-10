import { Router } from "express";

import { prisma } from "../app/instances/prisma";
import { AuthService } from "../services/auth.service";
import { ParentService } from "../services/parent.service";
import { CreateParentController } from "../controllers/parent/createParent";
import { UpdateParentController } from "../controllers/parent/updateParent";
import { DeleteParentController } from "../controllers/parent/deleteParent";
import { GetParentsController } from "../controllers/parent/getParents";
import { GetParentController } from "../controllers/parent/getParent";
import { AuditLogService } from "../services/auditLog.service";

export const parentRouter = Router();

// services
const auditLogService = new AuditLogService(prisma)

const parentService = new ParentService(prisma, auditLogService);
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
const deleteParentController = new DeleteParentController(
  parentService,
  authService
);
const getParentsController = new GetParentsController(
  parentService,
  authService
);
const getParentController = new GetParentController(
  parentService,
  authService
);

// routes initialization
parentRouter.post("/", createParentController.build());
parentRouter.patch("/:id", updateParentController.build());
parentRouter.delete("/:id", deleteParentController.build());

parentRouter.get("/", getParentsController.build());
parentRouter.get("/:id", getParentController.build());