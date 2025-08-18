import { ZodError } from "zod";
import { Request, Response } from "express";
import { IErrorHandler } from "../../shared/interfaces/IErrorHandler";
import { i18n } from "../../lang/i18n";

export class ZodErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof ZodError;
  }

  handle(error: ZodError, _req: Request, _res: Response) {
    return {
      statusCode: 400,
      message: i18n`errors.zod.validation_failed`,
      details: error.issues,
    };
  }
}
