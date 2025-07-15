import { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";
import { validateBodyMiddleware } from "../middlewares/validateBody";

interface HydratedRequest<T extends ZodType> extends Request {
  body: z.infer<T>;
}

export const validateBodyWrapper = <T extends ZodType>(
  dto: T,
  controller: (
    req: HydratedRequest<typeof dto>,
    res: Response,
    next?: NextFunction
  ) => void
) => {
  return [validateBodyMiddleware(dto), controller];
};
