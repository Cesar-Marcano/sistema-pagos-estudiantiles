import { PrismaClient } from "@prisma/client";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogService } from "../../../src/services/auditLog.service";

describe("AuditLogsService", () => {
  let prisma: PrismaClient;
  let auditLogService: AuditLogService;

  beforeAll(() => {
    prisma = createMockPrisma(["auditLog"]);
    auditLogService = new AuditLogService(prisma);
  });

  it("should register an audit log", () => {
    const data = {
      action: "CREATE",
      changes: JSON.stringify({ foo: "bar" }),
      entity: "test",
      entityId: 123,
      performedBy: 0,
    };

    auditLogService.register(data);

    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data,
    });
  });

  it("should get audit logs", () => {
    const page = 1;
    const pageSize = 10;
    auditLogService.list(page, pageSize);

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
    auditLogService.getLog(1);

    expect(prisma.auditLog.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
