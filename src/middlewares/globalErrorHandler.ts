import { Request, Response, NextFunction } from "express";
import { isDevelopment } from "../config/envVariables";

import { ZodErrorHandler } from "../errors/handlers/ZodErrorHandler";
import { JWTErrorHandler } from "../errors/handlers/JWTErrorHandler";
import { PrismaErrorHandler } from "../errors/handlers/PrismaErrorHandler";
import { BaseErrorHandler } from "../errors/handlers/BaseErrorHandler";
import { IErrorHandler } from "../interfaces/IErrorHandler";

const errorHandlers: IErrorHandler[] = [
  new ZodErrorHandler(),
  new JWTErrorHandler(),
  new PrismaErrorHandler(),
  new BaseErrorHandler(),
];

interface ErrorResponse {
  statusCode: number;
  message: string;
  details?: any;
}

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let response: ErrorResponse = {
    statusCode: 500,
    message: "Internal Server Error",
    details: undefined,
  };

  for (const handler of errorHandlers) {
    if (handler.canHandle(err)) {
      response = handler.handle(err, req, res);
      break;
    }
  }

  if (isDevelopment()) {
    response.details = response.details || {
      message: err.message,
      stack: err.stack,
    };
  }

  res.status(response.statusCode).json({
    message: response.message,
    ...(response.details && { details: response.details }),
  });
}
