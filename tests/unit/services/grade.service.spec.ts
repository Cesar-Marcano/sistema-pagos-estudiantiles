import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { GradeService } from "../../../src/services/grade.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogService } from "../../../src/services/auditLog.service";
import {
  deletedSampleGrade,
  sampleGrade,
  sampleGradeInput,
  updatedSampleGrade,
} from "../../helpers/data/grade.data";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLog.assertions";
import { BadRequestError } from "../../../src/errors/badRequest.error";
import { auditLogServiceMock } from "../../helpers/mocks/auditLogService.mock";

describe("GradeService", () => {
  let prisma: PrismaClient;
  let gradeService: GradeService;
  let auditLogService: AuditLogService;

  beforeEach(() => {
    prisma = createMockPrisma(["grade"], {
      grade: {
        create: jest.fn().mockResolvedValue(sampleGrade),
        findUnique: jest.fn().mockResolvedValue(sampleGrade),
        findMany: jest.fn().mockResolvedValue([sampleGrade]),
        update: jest.fn().mockResolvedValue(updatedSampleGrade),
      },
    });
    auditLogService = auditLogServiceMock();
    gradeService = new GradeService(prisma, auditLogService);
  });

  it("should create a new grade", async () => {
    const grade = await gradeService.create(sampleGradeInput);

    expectAuditLogCalledWith(auditLogService, "CREATE", "Grade", 1);

    expect(grade).toBe(sampleGrade);

    expect(prisma.grade.create).toHaveBeenCalledWith({
      data: sampleGradeInput,
    });
  });

  it("should retrieve a grade", async () => {
    const grade = await gradeService.findById(1);

    expect(auditLogService.register).not.toHaveBeenCalled();

    expect(prisma.grade.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 1,
          deletedAt: null,
        }),
      })
    );

    expect(grade).toBe(sampleGrade);
  });

  it("should retrieve all grades", async () => {
    const grades = await gradeService.findAll();

    expect(auditLogService.register).not.toHaveBeenCalled();

    expect(prisma.grade.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );

    expect(grades.length).toBeGreaterThan(0);
    expect(grades[0]).toBe(sampleGrade);
  });

  it("should update a grade", async () => {
    const updateData = { name: "Foo Bar" };

    const grade = await gradeService.update(1, updateData);

    expectAuditLogCalledWith(auditLogService, "UPDATE", "Grade", 1);

    expect(prisma.grade.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 1,
          deletedAt: null,
        }),
        data: updateData,
      })
    );

    expect(grade).toBe(updatedSampleGrade);
  });

  it("should fail with no update data for a grade", async () => {
    try {
      await gradeService.update(1, {});

      fail("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it("should delete a grade", async () => {
    (prisma.grade.update as jest.Mock) = jest
      .fn()
      .mockResolvedValue(deletedSampleGrade);

    const grade = await gradeService.delete(1);

    expectAuditLogCalledWith(auditLogService, "DELETE", "Grade", 1);

    expect(prisma.grade.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 1,
          deletedAt: null,
        }),
        data: expect.objectContaining({
          deletedAt: expect.any(Date),
        }),
      })
    );

    expect(grade).toEqual(deletedSampleGrade);
  });
});
