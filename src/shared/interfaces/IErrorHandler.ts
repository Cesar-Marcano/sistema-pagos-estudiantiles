import { Request, Response } from "express";

export interface IErrorHandler {
  canHandle(error: Error): boolean;
  handle(
    error: Error,
    req: Request,
    res: Response
  ): { statusCode: number; message: string; details?: any };
}
