import { AuditLog, PrismaClient } from "@prisma/client";

export class AuditLogsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async registerLog(data: Omit<AuditLog, "createdAt" | "id">) {
    return await this.prisma.auditLog.create({
      data,
    });
  }

  public async getLogs(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    return await this.prisma.auditLog.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public async getLog(logId: number) {
    return await this.prisma.auditLog.findUnique({
      where: {
        id: logId,
      },
    });
  }
}
