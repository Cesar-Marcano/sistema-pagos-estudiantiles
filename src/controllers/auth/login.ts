import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto, LoginUserSchema } from "../../dtos/users/loginUser.dto";
import { Controller, Handler, Middleware } from "../../app/controller";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { i18n } from "../../lang/i18n";
import { setRefreshTokenCookie } from "../../utils/cookies";

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

    if (cookieRefreshToken)
      throw new UnauthorizedError(i18n`errors.already_logged_in`);

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

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({ user });
  };
}
