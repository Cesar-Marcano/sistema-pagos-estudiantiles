import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthService, UserPayload } from "../services/auth.service";

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authGuard = (authService: AuthService, role?: Role) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const payload = authService.decodeAccessToken(token);

    if (role !== payload.role) {
      throw new Error("Unauthorized: role mismatch"); // TODO: use custom error
    }

    if (!payload) {
      throw new Error("Unauthorized"); // TODO: use custom error
    }

    req.user = payload;

    next();
  };
};
