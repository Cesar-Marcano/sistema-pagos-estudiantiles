import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { CreateUserSchema } from "../../dtos/createUser.dto";
import { UserService } from "../../services/user.service";
import { executeInDev } from "../../config/envVariables";

export const registerContrller = (userService: UserService) =>
  validateBodyWrapper(CreateUserSchema, async (req, res) => {
    try {
      const user = await userService.createUser(req.body);

      res.status(201).json(user);
    } catch (error) {
      executeInDev(() => {
        res.status(500).json(error);
      });
      
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  });
