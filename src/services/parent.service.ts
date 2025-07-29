import { PrismaClient, Parent } from "@prisma/client";

export class ParentService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createParent(
    data: Omit<Parent, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ): Promise<Parent> {
    return await this.prisma.parent.create({
      data: {
        ...data,
      },
    });
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
    return await this.prisma.parent.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });
  }

  public async deleteParent(id: number): Promise<Parent> {
    return await this.prisma.parent.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
