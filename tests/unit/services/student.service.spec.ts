import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { StudentService } from "../../../src/services/student.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import { auditLogsServiceMock } from "../../helpers/mocks/auditLogsService.mock";
import {
  deletedSampleStudent,
  sampleStudent,
  sampleStudentInput,
  updatedSampleStudent,
} from "../../helpers/data/student.data";
import { sampleGrade } from "../../helpers/data/grade.data";
import { BadRequestError } from "../../../src/errors/badRequest.error";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";
import { getPaginationSkip } from "../../helpers/utils/getPaginationSkip";

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
        findUnique: jest.fn().mockResolvedValue(sampleStudent),
        findMany: jest.fn().mockResolvedValue([sampleStudent]),
        update: jest.fn().mockResolvedValue(updatedSampleStudent),
      },
    });
    auditLogsService = auditLogsServiceMock();
    studentService = new StudentService(prisma, auditLogsService);
  });

  it("should create a new student", async () => {
    const student = await studentService.create(sampleStudentInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Student", 1);

    expect(student).toEqual(sampleStudent);
  });

  it("should not create a new student", async () => {
    try {
      (prisma.grade.findUnique as jest.Mock) = jest
        .fn()
        .mockResolvedValue(null);

      await studentService.create(sampleStudentInput);
      fail("Should fail");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it("should retrieve a student", async () => {
    const student = await studentService.findById(1);

    expect(student).toEqual(sampleStudent);

    expect(auditLogsService.registerLog).not.toHaveBeenCalled();

    expect(prisma.student.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );
  });

  it("should retrieve all students", async () => {
    const page = 1;
    const limit = 10;

    const { take, skip } = getPaginationSkip(page, limit);

    (prisma.$transaction as jest.Mock) = jest
      .fn()
      .mockResolvedValue([[sampleStudent], 1]);

    const students = await studentService.list({ page, limit });

    expect(students.data.length).toBeGreaterThan(0);
    expect(students.data[0]).toEqual(sampleStudent);
    expect(students).toEqual(
      expect.objectContaining({
        pagination: expect.objectContaining({
          total: 1,
          totalPages: Math.ceil(1 / limit),
          page,
          limit,
        }),
      })
    );

    expect(prisma.student.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip,
        take,
      })
    );

    expect(prisma.student.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );
  });

  it("should update a student", async () => {
      const student = await studentService.update(1, {
        fullname: "Andres Foo Bar",
      });
  
      expectAuditLogCalledWith(auditLogsService, "UPDATE", "Student", 1);
  
      expect(student).toEqual(updatedSampleStudent);
  
      expect(prisma.student.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deletedAt: null,
            id: 1,
          }),
          data: {
            fullname: "Andres Foo Bar",
          },
        })
      );
    });
  
    it("should not update a student", async () => {
      try {
        await studentService.update(1, {});
        fail("Should fail");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
  
    it("should delete a student", async () => {
      (prisma.student.update as jest.Mock) = jest
        .fn()
        .mockResolvedValue(deletedSampleStudent);
  
      const student = await studentService.delete(1);
  
      expectAuditLogCalledWith(auditLogsService, "DELETE", "Student", 1);
  
      expect(student).toEqual(
        expect.objectContaining({
          deletedAt: expect.any(Date),
        })
      );
  
      expect(prisma.student.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deletedAt: null,
          }),
          data: expect.objectContaining({
            deletedAt: expect.any(Date),
          }),
        })
      );
    });
});
