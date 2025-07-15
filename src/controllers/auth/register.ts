import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { CreateUserSchema } from "../../dtos/createUser.dto";
import { UserService } from "../../services/user.service";
import { executeInDev } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";

export const registerContrller = (
  userService: UserService,
  authService: AuthService
) =>
  validateBodyWrapper(CreateUserSchema, async (req, res) => {
    try {
      const user = await userService.createUser(req.body);

      const refreshToken = authService.retrieveRefreshToken({
        id: user.id,
        name: user.name,
        role: user.role,
        username: user.name,
      });

      res.status(201).json({ refreshToken });
    } catch (error) {
      executeInDev(() => {
        res.status(500).json(error);
      });

      res.status(500).json({ error: "Internal server error" });
      return;
    }
  });
