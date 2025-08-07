import { PrismaClient } from "@prisma/client";
import { createMockPrisma } from "../../factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";

describe("AuditLogsService", () => {
  let prisma: PrismaClient;
  let auditLogsService: AuditLogsService;

  beforeAll(() => {
    prisma = createMockPrisma(["auditLog"]);
    auditLogsService = new AuditLogsService(prisma);
  });

  it("Should register an audit log", () => {
    const data = {
      action: "CREATE",
      changes: JSON.stringify({ foo: "bar" }),
      entity: "test",
      entityId: 123,
      performedBy: 0,
    };

    auditLogsService.registerLog(data);

    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data,
    });
  });
});
