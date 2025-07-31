import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogsService } from "../services/auditLogs.service";
import { GradeService } from "../services/grade.service";
import { CreateGradeController } from "../controllers/grade/createGrade";

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

// routes initialization
gradeRouter.post("/", createStudentController.build());
