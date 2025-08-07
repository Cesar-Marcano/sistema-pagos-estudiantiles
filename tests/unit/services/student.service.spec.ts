import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { StudentService } from "../../../src/services/student.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import { auditLogsServiceMock } from "../../helpers/mocks/auditLogsService.mock";
import {
  sampleStudent,
  sampleStudentInput,
} from "../../helpers/data/student.data";
import { sampleGrade } from "../../helpers/data/grade.data";
import { BadRequestError } from "../../../src/errors/badRequest.error";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";

describe("StudentService", () => {
  let prisma: PrismaClient;
  let studentService: StudentService;
  let auditLogsService: AuditLogsService;

  beforeEach(() => {
    prisma = createMockPrisma(["student", "grade"], {
      grade: {
        findUnique: jest.fn().mockResolvedValue(sampleGrade),
      },
      student: {
        create: jest.fn().mockResolvedValue(sampleStudent),
      },
    });
    auditLogsService = auditLogsServiceMock();
    studentService = new StudentService(prisma, auditLogsService);
  });

  it("should create a new student", async () => {
    const student = await studentService.createStudent(sampleStudentInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Student", 1);

    expect(student).toEqual(sampleStudent);
  });

  it("should not create a new student", async () => {
    try {
      (prisma.grade.findUnique as jest.Mock) = jest
        .fn()
        .mockResolvedValue(null);

      await studentService.createStudent(sampleStudentInput);
      fail("Should fail");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });
});
