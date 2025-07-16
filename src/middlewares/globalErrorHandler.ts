import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { isDevelopment } from "../config/envVariables";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

export function globalErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";
  let details: any = undefined;

  if (err instanceof ZodError) {
    statusCode = 400; // Bad Request
    message = "Validation Failed";
    details = err.issues;
  } else if (
    err instanceof JsonWebTokenError ||
    err instanceof TokenExpiredError
  ) {
    statusCode = 401;
    message = "Invalid or expired token";
  } else if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;

      const targetFields =
        (err.meta?.target as string[] | undefined)?.join(", ") || "field(s)";
      message = `Duplicate entry for ${targetFields}.`;
      details = `The provided value for ${targetFields} already exists.`;
    }
  }

  if (isDevelopment()) {
    details = details || err.message;
    if (statusCode === 500) {
      details = {
        message: err.message,
        stack: err.stack,
        data: err.data || details,
      };
    }
  }

  res.status(statusCode).json({
    message: message,
    ...(details && { details: details }),
  });
}
