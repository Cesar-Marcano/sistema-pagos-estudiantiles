import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogsService } from "../services/auditLogs.service";
import { GradeService } from "../services/grade.service";
import { CreateGradeController } from "../controllers/grade/createGrade";
import { UpdateGradeController } from "../controllers/grade/updateGrade";
import { DeleteGradeController } from "../controllers/grade/deleteGrade";
import { GetGradeController } from "../controllers/grade/getGrade";

export const gradeRouter = Router();

// services
const auditLogService = new AuditLogsService(prisma);

const gradeService = new GradeService(prisma, auditLogService);
const authService = new AuthService(prisma);

// controllers
const createGradeController = new CreateGradeController(
  gradeService,
  authService
);
const updateGradeController = new UpdateGradeController(
  gradeService,
  authService
);
const deleteGradeController = new DeleteGradeController(
  gradeService,
  authService
);
const getGradeController = new GetGradeController(
  gradeService,
  authService
);

// routes initialization
gradeRouter.post("/", createGradeController.build());
gradeRouter.patch("/:id", updateGradeController.build());
gradeRouter.delete("/:id", deleteGradeController.build());

gradeRouter.get("/:id", getGradeController.build());
