import { ZodError } from "zod";
import { Request, Response } from "express";
import { IErrorHandler } from "../../interfaces/IErrorHandler";

export class ZodErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof ZodError;
  }

  handle(error: ZodError, req: Request, res: Response) {
    return {
      statusCode: 400,
      message: "Validation Failed",
      details: error.issues,
    };
  }
}
