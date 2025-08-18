import "../../helpers/mocks/asyncLocalStorage.mock";
import { NextFunction, Request, Response } from "express";
import { runWithUserContextMock } from "../../helpers/mocks/asyncLocalStorage.mock";
import {
  createMockRequest,
  createMockResponse,
} from "../../helpers/factories/express.factory";
import { AuthService } from "../../../src/services/auth.service";
import { authGuard } from "../../../src/middlewares/authGuard";
import { UserPayload } from "../../../src/shared/interfaces/tokenPayload";
import { Role } from "@prisma/client";
import { UnauthorizedError } from "../../../src/errors/unauthorized.error";

describe("AuthGuardMiddleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    req = createMockRequest({
      header: jest.fn().mockReturnValue("Bearer a1b2c3.token"),
      cookies: {
        refreshToken: "my.refresh.token",
      },
    });
    res = createMockResponse();
    next = jest.fn();
    authService = {
      decodeAccessToken: jest.fn().mockResolvedValue({
        id: 1,
        jti: "sample-jti",
        name: "Foo Bar",
        role: Role.ADMIN,
        username: "foo_bar99",
      } as UserPayload),
    } as unknown as AuthService;
  });

  it("should pass the auth guard", async () => {
    await authGuard(authService, Role.ADMIN, false)(req, res, next);

    expect(runWithUserContextMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should not pass the auth guard without the correct role", async () => {
    (authService.decodeAccessToken as jest.Mock).mockResolvedValue({
      ...(await authService.decodeAccessToken("")),
      role: Role.READONLY,
    } as UserPayload);

    await expect(
      authGuard(authService, Role.ADMIN, false)(req, res, next)
    ).rejects.toThrow(UnauthorizedError);

    expect(runWithUserContextMock).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("should not pass the auth guard without refresh token", async () => {
    req.cookies.refreshToken = undefined;

    await expect(
      authGuard(authService, Role.ADMIN, true)(req, res, next)
    ).rejects.toThrow(UnauthorizedError);

    expect(runWithUserContextMock).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("should not pass the auth guard without the access token", async () => {
    req.header = jest.fn().mockReturnValue(null);

    await expect(
      authGuard(authService, Role.ADMIN, false)(req, res, next)
    ).rejects.toThrow(UnauthorizedError);

    expect(runWithUserContextMock).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
