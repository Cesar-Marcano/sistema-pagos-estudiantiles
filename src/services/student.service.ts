import { PrismaClient, Student } from "@prisma/client";

export class StudentService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createStudent(
    data: Omit<Student, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ): Promise<Student> {
    return await this.prisma.student.create({ data });
  }

  public async getStudentById(id: number): Promise<Student | null> {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  public async getAllStudents(params: {
    page: number;
    limit: number;
    search?: string;
  }) {
    const { page, limit, search } = params;
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
    return await this.prisma.student.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });
  }

  public async deleteStudent(id: number): Promise<Student> {
    return await this.prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
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
