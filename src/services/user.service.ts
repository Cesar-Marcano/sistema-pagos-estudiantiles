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
}
