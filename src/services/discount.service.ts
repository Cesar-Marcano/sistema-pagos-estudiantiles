import { Discount, PrismaClient } from "@prisma/client";
import { CrudInput } from "../interfaces/crudInput";
import { getUserId } from "../utils/asyncLocalStorage";
import { AuditLogService } from "./auditLog.service";
import { BadRequestError } from "../errors/badRequest.error";
import { i18n } from "../lang/i18n";

export class DiscountService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogService: AuditLogService
  ) {}

  async create(input: CrudInput<Discount>) {
    const userId = getUserId()!;

    const discount = await this.prisma.discount.create({
      data: {
        ...input,
        userId,
      },
    });

    this.auditLogService.register({
      action: "CREATE",
      changes: JSON.stringify(discount),
      entity: "Discount",
      entityId: discount.id,
      performedBy: userId,
    });

    return discount;
  }

  async update(id: number, input: Partial<CrudInput<Discount>>) {
    if (Object.keys(input).length < 1) {
      throw new BadRequestError(i18n`errors.validation.no_data`);
    }

    const userId = getUserId()!;

    const discount = await this.prisma.discount.update({
      where: {
        id,
        deletedAt: null,
      },
      data: input,
    });

    this.auditLogService.register({
      action: "UPDATE",
      changes: JSON.stringify(discount),
      entity: "Discount",
      entityId: discount.id,
      performedBy: userId,
    });

    return discount;
  }

  async delete(id: number) {
    const userId = getUserId()!;

    const discount = await this.prisma.discount.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    this.auditLogService.register({
      action: "DELETE",
      changes: JSON.stringify(discount),
      entity: "Discount",
      entityId: discount.id,
      performedBy: userId,
    });

    return discount;
  }

  async findById(id: number) {
    return await this.prisma.discount.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAll() {
    return await this.prisma.discount.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async applyDiscount(discountId: number, studentId: number) {
    if (!(await this.findById(discountId))) {
      throw new BadRequestError(i18n`errors.prisma.record_not_found.message`);
    }

    const student = await this.prisma.student.update({
      where: {
        deletedAt: null,
        id: studentId,
      },
      data: {
        discounts: {
          connect: {
            id: discountId,
          },
        },
      },
    });

    await this.auditLogService.register({
      action: "UPDATE",
      changes: JSON.stringify({ studentId, discountId }),
      entity: "Student",
      entityId: studentId,
      performedBy: getUserId()!,
    });

    return student;
  }
}
