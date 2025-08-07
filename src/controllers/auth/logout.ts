import { Controller, Handler, Middleware } from "../../app/controller";
import { AuthService } from "../../services/auth.service";
import { BadRequestError } from "../../errors/badRequest.error";
import { i18n } from "../../lang/i18n";
import { deleteRefreshTokenCookie } from "../../utils/cookies";

export class LogoutController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new BadRequestError(i18n`errors.not_logged_in`);

    deleteRefreshTokenCookie(res);

    try {
      const payload = await this.authService.decodeRefreshToken(refreshToken);

      await this.authService.logout(payload.jti, payload.id);
    } catch (error) {
      console.warn(
        "[LogoutController] Failed to decode or logout refresh token",
        error
      );
    }

    res.status(200).json({});
  };
}
