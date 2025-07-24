import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto, LoginUserSchema } from "../../dtos/loginUser.dto";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { isDevelopment, REFRESH_TOKEN_EXP } from "../../config/envVariables";
import ms from "ms";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { i18n } from "../../lang/i18n";

export class LoginController extends Controller<LoginUserDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [validateBodyMiddleware(LoginUserSchema)];

  public handler: Handler<LoginUserDto> = async (req, res) => {
    const cookieRefreshToken = req.cookies.refreshToken;

    if (cookieRefreshToken) throw new UnauthorizedError(i18n`errors.already_logged_in`);

    const user = await this.userService.loginUser(
      req.body.username,
      req.body.password
    );

    const refreshToken = await this.authService.retrieveRefreshToken({
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

    res.status(200).json({ user });
  };
}
