import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { ParentService } from "../../../src/services/parent.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import { auditLogsServiceMock } from "../../helpers/mocks/auditLogsService.mock";
import {
  sampleParent,
  sampleParentInput,
} from "../../helpers/data/parent.data";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";

describe("ParentService", () => {
  let prisma: PrismaClient;
  let auditLogsService: AuditLogsService;
  let parentService: ParentService;

  beforeEach(() => {
    prisma = createMockPrisma(["parent"], {
      parent: {
        create: jest.fn().mockResolvedValue(sampleParent),
        findUnique: jest.fn().mockResolvedValue(sampleParent),
      },
    });
    auditLogsService = auditLogsServiceMock();
    parentService = new ParentService(prisma, auditLogsService);
  });

  it("should create a parent", async () => {
    const parent = await parentService.createParent(sampleParentInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Parent", 1);

    expect(parent).toEqual(sampleParent);
    expect(prisma.parent.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: sampleParentInput,
      })
    );
  });

  it("should retrieve a parent by id", async () => {
    const parent = await parentService.getParentById(1);

    expect(auditLogsService.registerLog).not.toHaveBeenCalled();

    expect(parent).toEqual(sampleParent);

    expect(prisma.parent.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );
  });
});
