import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { UserService } from "../../services/user.service";
import { executeInDev } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";
import { LoginUserSchema } from "../../dtos/loginUser.dto";

export const loginController = (
  userService: UserService,
  authService: AuthService
) =>
  validateBodyWrapper(LoginUserSchema, async (req, res) => {
    try {
      const user = await userService.loginUser(
        req.body.username,
        req.body.password
      );

      const refreshToken = authService.retrieveRefreshToken({
        id: user.id,
        name: user.name,
        role: user.role,
        username: user.name,
      });

      res.status(201).json({ refreshToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }

      executeInDev(() => {
        throw error;
      });

      res.status(500);
    }
  });
