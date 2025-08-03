import { Router } from "express";

import { prisma } from "../prisma";
import { AuthService } from "../services/auth.service";
import { AuditLogsService } from "../services/auditLogs.service";
import { StudentService } from "../services/student.service";
import { CreateStudentController } from "../controllers/student/createStudent";
import { DeleteStudentController } from "../controllers/student/deleteStudent";
import { GetStudentController } from "../controllers/student/getStudent";
import { GetStudentsController } from "../controllers/student/getStudents";

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
const deleteStudentController = new DeleteStudentController(
  studentService,
  authService
);
const getStudentController = new GetStudentController(
  studentService,
  authService
);
const getStudentsController = new GetStudentsController(
  studentService,
  authService
);

// routes initialization
studentRouter.post("/", createStudentController.build());
studentRouter.delete("/:id", deleteStudentController.build());

studentRouter.get("/:id", getStudentController.build());
studentRouter.get("/", getStudentsController.build());
