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

    try {
      if (!token) {
        throw new Error("Unauthorized");
      }

      const payload = authService.decodeAccessToken(token);

      if (role !== payload.role) {
        throw new Error("Unauthorized: role mismatch");
      }

      req.user = payload;
    } catch (error) {
      res.status(403).json({ message: "Unauthorized" });
    }
  };
};
