import { Grade, PrismaClient } from "@prisma/client";
import { AuditLogsService } from "./auditLogs.service";
import { getUserId } from "../utils/asyncLocalStorage";
import { BadRequestError } from "../errors/badRequest.error";
import { i18n } from "../lang/i18n";

export class GradeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogsService: AuditLogsService
  ) {}

  public async createGrade(
    grade: Omit<Grade, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const newGrade = await this.prisma.grade.create({
      data: grade,
    });

    const userId = getUserId();

    await this.auditLogsService.registerLog({
      action: "CREATE",
      changes: JSON.stringify(newGrade),
      entity: "Grade",
      entityId: newGrade.id,
      performedBy: userId!,
    });

    return newGrade;
  }

  public async getGrade(gradeId: number) {
    return await this.prisma.grade.findUnique({
      where: {
        id: gradeId,
        deletedAt: null,
      },
    });
  }

  public async getGrades() {
    return await this.prisma.grade.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async updateGrade(
    gradeId: number,
    updateData: Partial<
      Omit<Grade, "id" | "createdAt" | "updatedAt" | "deletedAt">
    >
  ) {
    if (Object.keys(updateData).length < 1) {
      throw new BadRequestError(i18n`errors.validation.no_data`);
    }

    const updatedGrade = await this.prisma.grade.update({
      where: {
        id: gradeId,
      },
      data: updateData,
    });

    const userId = getUserId();

    await this.auditLogsService.registerLog({
      action: "UPDATE",
      changes: JSON.stringify(updateData),
      entity: "Grade",
      entityId: gradeId,
      performedBy: userId!,
    });

    return updatedGrade;
  }

  public async deleteGrade(gradeId: number) {
    const deletedGrade = await this.prisma.grade.update({
      where: {
        id: gradeId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    const userId = getUserId();

    await this.auditLogsService.registerLog({
      action: "DELETE",
      changes: JSON.stringify(deletedGrade),
      entity: "Grade",
      entityId: gradeId,
      performedBy: userId!,
    });

    return deletedGrade;
  }
}
