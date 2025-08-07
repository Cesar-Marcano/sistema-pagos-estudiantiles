import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { GradeService } from "../../../src/services/grade.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import {
  deletedSampleGrade,
  sampleGrade,
  sampleGradeInput,
  updatedSampleGrade,
} from "../../helpers/data/grade.data";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";
import { BadRequestError } from "../../../src/errors/badRequest.error";

describe("GradeService", () => {
  let prisma: PrismaClient;
  let gradeService: GradeService;
  let auditLogsService: AuditLogsService;

  beforeAll(() => {
    prisma = createMockPrisma(["grade"], {
      grade: {
        create: jest.fn().mockResolvedValue(sampleGrade),
        findUnique: jest.fn().mockResolvedValue(sampleGrade),
        findMany: jest.fn().mockResolvedValue([sampleGrade]),
        update: jest.fn().mockResolvedValue(updatedSampleGrade),
      },
    });
    auditLogsService = {
      registerLog: jest.fn(),
    } as unknown as AuditLogsService;
    gradeService = new GradeService(prisma, auditLogsService);
  });

  it("should create a new grade", async () => {
    const grade = await gradeService.createGrade(sampleGradeInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Grade", 1);

    expect(grade).toBe(sampleGrade);

    expect(prisma.grade.create).toHaveBeenCalledWith({
      data: sampleGradeInput,
    });
  });

  it("should retrieve a grade", async () => {
    const grade = await gradeService.getGrade(1);

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
    const grades = await gradeService.getGrades();

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

    const grade = await gradeService.updateGrade(1, updateData);

    expectAuditLogCalledWith(auditLogsService, "UPDATE", "Grade", 1);

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
      await gradeService.updateGrade(1, {});

      fail("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it("should delete a grade", async () => {
    (prisma.grade.update as jest.Mock) = jest
      .fn()
      .mockResolvedValue(deletedSampleGrade);

    const grade = await gradeService.deleteGrade(1);

    expectAuditLogCalledWith(auditLogsService, "DELETE", "Grade", 1);

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
