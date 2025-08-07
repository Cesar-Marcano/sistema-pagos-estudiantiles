import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { GradeService } from "../../../src/services/grade.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import { sampleGrade, sampleGradeInput } from "../../helpers/data/grade.data";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";

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
});
