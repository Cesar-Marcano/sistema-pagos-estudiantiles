import { PrismaClient } from "@prisma/client";
import { jwtMock } from "../../helpers/mocks/jsonwebtoken.mock";
import { AuthService } from "../../../src/services/auth.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { sessionData, userMock } from "../../helpers/data/auth.data";
import { UserPayload } from "../../../src/interfaces/tokenPayload";
import { UnauthorizedError } from "../../../src/errors/unauthorized.error";

describe("AuthService", () => {
  let prisma: PrismaClient;
  let authService: AuthService;

  const mockedJti = "mocked-jti";

  beforeEach(() => {
    prisma = createMockPrisma(["session", "user"], {
      user: {
        count: jest.fn().mockResolvedValue(1),
      },
      session: {
        create: jest.fn().mockResolvedValue(sessionData),
      },
    });
    authService = new AuthService(prisma);
  });

  it("Should get session", async () => {
    await authService.getSession(1);

    expect(prisma.session.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      select: {
        jti: true,
      },
    });
  });

  it("Should close session", async () => {
    await authService.closeSession(1, 123);

    expect(prisma.session.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
        user: {
          id: 123,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  });

  it("Should get user sessions", async () => {
    await authService.getUserSessions(123);

    expect(prisma.session.findMany).toHaveBeenCalledWith({
      where: {
        user: {
          id: 123,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  });

  it("Should logout", async () => {
    await authService.logout(mockedJti, 123);

    expect(prisma.session.delete).toHaveBeenCalledWith({
      where: {
        jti: mockedJti,
        user: {
          id: 123,
        },
      },
    });
  });

  it("Should retrieve refresh token", async () => {
    const token = await authService.retrieveRefreshToken(userMock);

    expect(jwtMock.sign).toHaveBeenCalledWith(
      {
        ...userMock,
        jti: mockedJti,
      },
      expect.any(String),
      { expiresIn: expect.any(String) }
    );

    expect(token).toBe("mocked.jwt.token");

    expect(prisma.session.create).toHaveBeenCalledWith({
      data: {
        userId: userMock.id,
      },
    });
  });

  it("Should retrieve access token", async () => {
    (prisma.session.findUnique as jest.Mock).mockResolvedValue({});

    const userPayload = jwtMock.verify("", "", {}) as UserPayload;
    const token = await authService.retrieveAccessToken(userPayload);

    expect(jwtMock.sign).toHaveBeenCalledWith(userPayload, expect.any(String), {
      expiresIn: expect.any(String),
    });

    expect(token).toBe("mocked.jwt.token");

    expect(prisma.session.findUnique).toHaveBeenCalledWith({
      where: {
        jti: userPayload.jti,
        user: {
          id: userPayload.id,
        },
      },
    });
  });

  it("Should throw if user does not exist", async () => {
    (prisma.user.count as jest.Mock).mockResolvedValue(0);

    await expect(
      authService.retrieveAccessToken({
        ...userMock,
        jti: mockedJti,
      })
    ).rejects.toThrow(UnauthorizedError);
  });
});
