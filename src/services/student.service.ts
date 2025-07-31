import { PrismaClient, Student } from "@prisma/client";
import { AuditLogsService } from "./auditLogs.service";
import { getUserId } from "../asyncLocalStorage";

export class StudentService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogService: AuditLogsService
  ) {}

  public async createStudent(
    data: Omit<Student, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ): Promise<Student> {
    const newStudent = await this.prisma.student.create({ data });

    const userId = getUserId();

    await this.auditLogService.registerLog({
      action: "CREATE",
      changes: JSON.stringify(newStudent),
      entity: "Student",
      entityId: newStudent.id,
      performedBy: userId!,
    });

    return newStudent;
  }

  public async getStudentById(id: number): Promise<Student | null> {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  public async getAllStudents(params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.student.count({
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

  public async updateStudent(
    id: number,
    updateData: Partial<Student>
  ): Promise<Student> {
    const updatedStudent = await this.prisma.student.update({
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
      entity: "Student",
      entityId: updatedStudent.id,
      performedBy: userId!,
    });

    return updatedStudent;
  }

  public async deleteStudent(id: number): Promise<Student> {
    const deletedStudent = await this.prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    const userId = getUserId();

    await this.auditLogService.registerLog({
      action: "DELETE",
      changes: JSON.stringify(deletedStudent),
      entity: "Student",
      entityId: deletedStudent.id,
      performedBy: userId!,
    });

    return deletedStudent;
  }

  public async getStudentsByParentId(parentId: number): Promise<Student[]> {
    return await this.prisma.student.findMany({
      where: { parentId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  public async getStudentsByGradeId(gradeId: number): Promise<Student[]> {
    return await this.prisma.student.findMany({
      where: { gradeId, deletedAt: null },
      orderBy: { fullname: "asc" },
    });
  }
}
