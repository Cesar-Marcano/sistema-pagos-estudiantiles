import { PrismaClient } from "@prisma/client";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";

describe("AuditLogsService", () => {
  let prisma: PrismaClient;
  let auditLogsService: AuditLogsService;

  beforeAll(() => {
    prisma = createMockPrisma(["auditLog"]);
    auditLogsService = new AuditLogsService(prisma);
  });

  it("should register an audit log", () => {
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

  it("should get audit logs", () => {
    const page = 1;
    const pageSize = 10;
    auditLogsService.getLogs(page, pageSize);

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
      skip,
      take,
      orderBy: {
        createdAt: expect.any(String),
      },
    });
  });

  it("should get an audit log", () => {
    auditLogsService.getLog(1);

    expect(prisma.auditLog.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
