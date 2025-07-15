import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType, treeifyError } from "zod";
import { executeInDev } from "../config/envVariables";

export const validateBodyMiddleware = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);

      req.body = parsedBody;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: error.issues,
        });
        return;
      }

      res.status(500);

      executeInDev(() => {
        res.json({ error });
      });
    }
  };
};
