import { Request, Response } from "express";
import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { CreateUserSchema } from "../../dtos/createUser.dto";

export const loginController = validateBodyWrapper(
  CreateUserSchema,
  (req: Request, res: Response) => {
    res.send("hello");
  }
);
