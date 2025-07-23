import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateBodyMiddleware = (schema: ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync(req.body);

    req.body = parsedBody;
    next();
  };
};
