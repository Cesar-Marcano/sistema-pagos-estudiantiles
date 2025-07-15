import { Request, Response } from "express";

export function loginController(req: Request, res: Response) {
  res.send("hello");
}
