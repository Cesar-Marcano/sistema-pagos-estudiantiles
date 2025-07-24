import { Controller, Handler, Middleware } from "../../utils/controller";
import { isDevelopment } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";
import { BadRequestError } from "../../errors/badRequest.error";
import { i18n } from "../../lang/i18n";

export class LogoutController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new BadRequestError(i18n`errors.not_logged_in`)

    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "strict",
      maxAge: 0,
    });

    try {
      const payload = await this.authService.decodeRefreshToken(refreshToken);

      await this.authService.logout(payload.jti, payload.id);
    } catch (error) {}

    res.status(200).json({});
  };
}
