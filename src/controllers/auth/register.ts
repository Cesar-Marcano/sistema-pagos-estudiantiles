import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { CreateUserSchema } from "../../dtos/createUser.dto";

export const registerContrller = validateBodyWrapper(
  CreateUserSchema,
  (req, res) => {
    res.send("hello");
  }
);
