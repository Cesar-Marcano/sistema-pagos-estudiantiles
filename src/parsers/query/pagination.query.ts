import { Request } from "express";
import z from "zod";

export interface Pagination {
  page: number;
  limit: number;
}

export function parsePaginationQuery(req: Request): Pagination {
  const querySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  });

  return querySchema.parse(req.query);
}
