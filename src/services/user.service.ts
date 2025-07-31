import { PrismaClient, Role, User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { CreateUserSchema } from "../dtos/createUser.dto";
import { BadRequestError } from "../errors/badRequest.error";
import { i18n } from "../lang/i18n";
import { AuditLogsService } from "./auditLogs.service";
import { getUserId } from "../asyncLocalStorage";

export class UserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogService: AuditLogsService
  ) {}

  public async createUser(userData: z.infer<typeof CreateUserSchema>) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password,
      },
      omit: {
        password: true,
      },
    });

    const userId = getUserId();

    this.auditLogService.registerLog({
      action: "CREATE",
      entity: "User",
      changes: JSON.stringify(newUser),
      entityId: newUser.id,
      performedBy: userId!,
    });

    return newUser;
  }

  public async getUserLoginInfo(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new BadRequestError(i18n`errors.validation.user_not_found`);
    }

    return user;
  }

  public async loginUser(
    username: string,
    password: string
  ): Promise<Omit<User, "password">> {
    const user = await this.getUserLoginInfo(username);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestError(i18n`errors.validation.incorrect_password`);
    }

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  public async adminExists() {
    const adminsCount = await this.prisma.user.count({
      where: {
        role: Role.ADMIN,
        deletedAt: null,
      },
    });

    return adminsCount > 0;
  }

  public async createSuperuser(
    username: string,
    password: string,
    name: string
  ) {
    const adminAlreadyExists = await this.adminExists();

    if (adminAlreadyExists) {
      throw new BadRequestError(i18n`errors.validation.super_user_exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      },
    });

    this.auditLogService.registerLog({
      action: "CREATE",
      entity: "User",
      changes: JSON.stringify(newAdmin),
      entityId: newAdmin.id,
      performedBy: newAdmin.id!,
    });

    return newAdmin;
  }
}
