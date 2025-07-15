import { Request, Response } from "express";
import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { CreateUserSchema } from "../../dtos/createUser.dto";

export const registerContrller = validateBodyWrapper(
  CreateUserSchema,
  (req: Request, res: Response) => {
    res.send("hello");
  }
);
