import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogsService } from "../services/auditLogs.service";
import { StudentService } from "../services/student.service";
import { CreateStudentController } from "../controllers/student/createStudent";

export const studentRouter = Router();

// services
const auditLogService = new AuditLogsService(prisma);

const studentService = new StudentService(prisma, auditLogService);
const authService = new AuthService(prisma);

// controllers
const createStudentController = new CreateStudentController(
  studentService,
  authService
);

// routes initialization
studentRouter.post("/", createStudentController.build());
