import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { i18n } from "../lang/i18n";
import { UserPayload } from "../interfaces/tokenPayload";

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authGuard = (
  authService: AuthService,
  role?: Role | "any",
  failOnMissingRefresh = false
) => {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.cookies.refreshToken && failOnMissingRefresh) {
      throw new UnauthorizedError(i18n`errors.invalid_session`)
    }

    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError();
    }

    const payload = await authService.decodeAccessToken(token);

    if (role && role !== "any" && role !== payload.role) {
      throw new UnauthorizedError(i18n`errors.unauthorized.rolemismatch`);
    }

    if (!payload) {
      throw new UnauthorizedError();
    }

    req.user = payload;

    next();
  };
};
