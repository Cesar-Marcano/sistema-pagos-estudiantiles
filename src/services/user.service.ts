import { PrismaClient, Role, User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { CreateUserSchema } from "../dtos/users/createUser.dto";
import { BadRequestError } from "../errors/badRequest.error";
import { i18n } from "../lang/i18n";
import { AuditLogService } from "./auditLog.service";
import { getUserId } from "../utils/asyncLocalStorage";

export class UserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly auditLogService: AuditLogService
  ) {}

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async createUserInternal(
    data: Omit<User, "id" | "deletedAt" | "updatedAt" | "createdAt">
  ): Promise<Omit<User, "password">> {
    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    this.auditLogService.register({
      action: "CREATE",
      entity: "User",
      changes: JSON.stringify({ ...newUser, password: undefined }),
      entityId: newUser.id,
      performedBy: newUser.id ?? getUserId()!,
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  public async createUser(userData: z.infer<typeof CreateUserSchema>) {
    return this.createUserInternal(userData);
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
    if (await this.adminExists()) {
      throw new BadRequestError(i18n`errors.validation.super_user_exists`);
    }

    return this.createUserInternal({
      username,
      password,
      name,
      role: Role.ADMIN,
    });
  }
}
