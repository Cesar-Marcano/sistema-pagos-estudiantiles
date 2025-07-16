import { UserService } from "../../services/user.service";
import { executeInDev } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto, LoginUserSchema } from "../../dtos/loginUser.dto";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { validateBodyMiddleware } from "../../middlewares/validateBody";

export class LoginController extends Controller<LoginUserDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [validateBodyMiddleware(LoginUserSchema)];

  public handler: Handler<LoginUserDto> = async (req, res) => {
    try {
      const user = await this.userService.loginUser(
        req.body.username,
        req.body.password
      );

      const refreshToken = this.authService.retrieveRefreshToken({
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
  };
}
