import { PrismaClient, Parent } from "@prisma/client";
import { getUserId } from "../asyncLocalStorage";
import { AuditLogsService } from "./auditLogs.service";
import { BadRequestError } from "../errors/badRequest.error";
import { i18n } from "../lang/i18n";

export class ParentService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogService: AuditLogsService
  ) {}

  public async createParent(
    data: Omit<Parent, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ): Promise<Parent> {
    const newParent = await this.prisma.parent.create({
      data: {
        ...data,
      },
    });

    const userId = getUserId();

    await this.auditLogService.registerLog({
      action: "CREATE",
      changes: JSON.stringify(newParent),
      entity: "Parent",
      entityId: newParent.id,
      performedBy: userId!,
    });

    return newParent;
  }

  public async getParentById(id: number): Promise<Parent | null> {
    return await this.prisma.parent.findUnique({
      where: { id },
    });
  }

  public async getAllParents(params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.parent.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      this.prisma.parent.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  public async updateParent(
    id: number,
    updateData: Partial<Parent>
  ): Promise<Parent> {
    if (Object.keys(updateData).length < 1) {
      throw new BadRequestError(i18n`errors.validation.no_data`);
    }

    const updatedParent = await this.prisma.parent.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    const userId = getUserId();

    await this.auditLogService.registerLog({
      action: "UPDATE",
      changes: JSON.stringify(updateData),
      entity: "Parent",
      entityId: updatedParent.id,
      performedBy: userId!,
    });

    return updatedParent;
  }

  public async deleteParent(id: number): Promise<Parent> {
    const deletedParent = await this.prisma.parent.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    const userId = getUserId();

    await this.auditLogService.registerLog({
      action: "DELETE",
      changes: JSON.stringify(deletedParent),
      entity: "Parent",
      entityId: deletedParent.id,
      performedBy: userId!,
    });

    return deletedParent;
  }
}
