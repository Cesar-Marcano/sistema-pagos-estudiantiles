import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogsService } from "../services/auditLogs.service";
import { GradeService } from "../services/grade.service";
import { CreateGradeController } from "../controllers/grade/createGrade";
import { UpdateGradeController } from "../controllers/grade/updateGrade";
import { DeleteGradeController } from "../controllers/grade/deleteGrade";

export const gradeRouter = Router();

// services
const auditLogService = new AuditLogsService(prisma);

const gradeService = new GradeService(prisma, auditLogService);
const authService = new AuthService(prisma);

// controllers
const createStudentController = new CreateGradeController(
  gradeService,
  authService
);
const updateStudentController = new UpdateGradeController(
  gradeService,
  authService
);
const deleteStudentController = new DeleteGradeController(
  gradeService,
  authService
);

// routes initialization
gradeRouter.post("/", createStudentController.build());
gradeRouter.patch("/:id", updateStudentController.build());
gradeRouter.delete("/:id", deleteStudentController.build());
