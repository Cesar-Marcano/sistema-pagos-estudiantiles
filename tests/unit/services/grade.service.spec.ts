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

  beforeEach(() => {
    prisma = createMockPrisma(["grade"]);
    auditLogsService = {
      registerLog: jest.fn(),
    } as unknown as AuditLogsService;
    gradeService = new GradeService(prisma, auditLogsService);
  });

  it("should create a new grade", async () => {
    (prisma.grade.create as jest.Mock) = jest
      .fn()
      .mockResolvedValue(sampleGrade);

    const grade = await gradeService.createGrade(sampleGradeInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Grade", 1);

    expect(grade).toBe(sampleGrade);

    expect(prisma.grade.create).toHaveBeenCalledWith({
      data: sampleGradeInput,
    });
  });

  it("should retrieve a grade", async () => {
    (prisma.grade.findUnique as jest.Mock) = jest
      .fn()
      .mockResolvedValue(sampleGrade);

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
});
