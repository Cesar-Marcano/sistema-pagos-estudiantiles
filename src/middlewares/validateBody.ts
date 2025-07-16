import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { executeInDev } from "../config/envVariables";

export const validateBodyMiddleware = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync(req.body);

    req.body = parsedBody;
    next();
  };
};
