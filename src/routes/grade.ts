import { Router } from "express";

import { prisma } from "../app/instances/prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogService } from "../services/auditLog.service";
import { GradeService } from "../services/grade.service";
import { CreateGradeController } from "../controllers/grade/createGrade";
import { UpdateGradeController } from "../controllers/grade/updateGrade";
import { DeleteGradeController } from "../controllers/grade/deleteGrade";
import { GetGradeController } from "../controllers/grade/getGrade";
import { GetGradesController } from "../controllers/grade/getGrades";

export const gradeRouter = Router();

// services
const auditLogService = new AuditLogService(prisma);

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
const getGradesController = new GetGradesController(
  gradeService,
  authService
);

// routes initialization
gradeRouter.post("/", createGradeController.build());
gradeRouter.patch("/:id", updateGradeController.build());
gradeRouter.delete("/:id", deleteGradeController.build());

gradeRouter.get("/:id", getGradeController.build());
gradeRouter.get("/", getGradesController.build());
