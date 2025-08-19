import { Request } from "express";
import z from "zod";

export function parseIdParam(req: Request, paramName = "id"): number {
  const schema = z.object({ [paramName]: z.coerce.number().int().min(1) });
  return schema.parse(req.params)[paramName];
}
