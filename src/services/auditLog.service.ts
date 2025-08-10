import { AuditLog, PrismaClient } from "@prisma/client";

export class AuditLogService {
  constructor(private readonly prisma: PrismaClient) {}

  public async register(data: Omit<AuditLog, "createdAt" | "id">) {
    return await this.prisma.auditLog.create({
      data,
    });
  }

  public async list(page: number = 1, pageSize: number = 10) {
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
