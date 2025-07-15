import { PrismaClient, Role } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { CreateUserSchema } from "../dtos/createUser.dto";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createUser(userData: z.infer<typeof CreateUserSchema>) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData.password, salt);

    return await this.prisma.user.create({
      data: {
        ...userData,
        password,
      },
      omit: {
        password: true,
      },
    });
  }

  public async getUserLoginInfo(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        name: true,
        password: true,
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error("User not found"); // TODO: replace with a custom error
    }

    return user;
  }

  public async loginUser(username: string, password: string) {
    const user = await this.getUserLoginInfo(username);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password"); // TODO: replace with a custom error
    }

    return user;
  }
}
