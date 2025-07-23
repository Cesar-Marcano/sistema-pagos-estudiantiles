import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService, UserPayload } from "../services/auth.service";
import { UnauthorizedError } from "../errors/unauthorized.error";

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authGuard = (authService: AuthService, role?: Role) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError();
    }

    const payload = authService.decodeAccessToken(token);

    if (role !== payload.role) {
      throw new UnauthorizedError("Role mismatch");
    }

    if (!payload) {
      throw new UnauthorizedError();
    }

    req.user = payload;

    next();
  };
};
