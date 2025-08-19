import { PrismaClient, Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_EXP,
} from "../config/envVariables";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { i18n } from "../lang/i18n";
import { RawUserPayload, UserPayload } from "../shared/interfaces/tokenPayload";
import { getEnv } from "../shared/utils/getEnv";

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  private refreshSecret = getEnv("JWT_REFRESH", "super-secret-refresh");
  private accessSecret = getEnv("JWT_ACCESS", "super-secret-access");

  private async checkUser(userId: number) {
    const userCount = await this.prisma.user.count({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (userCount < 1)
      throw new UnauthorizedError(i18n`errors.auth.the_user_does_not_exist`);
  }

  public async retrieveRefreshToken(user: RawUserPayload) {
    await this.checkUser(user.id);
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
      },
    });

    const payload: UserPayload = {
      ...user,
      jti: session.jti,
    };

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: REFRESH_TOKEN_EXP,
    });
  }

  public async decodeRefreshToken(token: string) {
    const payload = jwt.verify(token, this.refreshSecret) as UserPayload;

    await this.checkSession(payload.jti, payload.id);

    return payload;
  }

  public async retrieveAccessToken(user: UserPayload) {
    await this.checkUser(user.id);

    await this.checkSession(user.jti, user.id);

    return jwt.sign(user, this.accessSecret, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
  }

  public async decodeAccessToken(token: string) {
    const payload = jwt.verify(token, this.accessSecret) as UserPayload;

    await this.checkSession(payload.jti, payload.id);

    return payload;
  }

  private async isSessionValid(jti: string, userId: number) {
    const session = await this.prisma.session.findUnique({
      where: {
        jti,
        user: {
          id: userId,
        },
      },
    });

    return !!session;
  }

  public async logout(jti: string, userId: number) {
    await this.prisma.session.delete({
      where: {
        jti,
        user: {
          id: userId,
        },
      },
    });
  }

  private async checkSession(jti: string, userId: number) {
    await this.checkUser(userId);

    const isSessionValid = await this.isSessionValid(jti, userId);

    if (!isSessionValid)
      throw new UnauthorizedError(i18n`errors.invalid_session`);
  }

  public async getUserSessions(userId: number) {
    return await this.prisma.session.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  }

  public async closeSession(sessionId: number, userId: number) {
    return await this.prisma.session.delete({
      where: {
        id: sessionId,
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  }

  public async getSession(sessionId: number) {
    return await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        jti: true,
      },
    });
  }
}
