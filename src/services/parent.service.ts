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

  public async getAllParents(): Promise<Parent[]> {
    return await this.prisma.parent.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
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
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
