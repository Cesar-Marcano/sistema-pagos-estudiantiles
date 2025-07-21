import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto, LoginUserSchema } from "../../dtos/loginUser.dto";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { isDevelopment, REFRESH_TOKEN_EXP } from "../../config/envVariables";
import ms from "ms";

export class LoginController extends Controller<LoginUserDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [validateBodyMiddleware(LoginUserSchema)];

  public handler: Handler<LoginUserDto> = async (req, res) => {
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "strict",
      maxAge: ms(REFRESH_TOKEN_EXP),
    });

    res.status(201).json({ user });
  };
}
