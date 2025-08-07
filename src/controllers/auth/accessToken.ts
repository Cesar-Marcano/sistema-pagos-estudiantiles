import { BadRequestError } from "../../errors/badRequest.error";
import { i18n } from "../../lang/i18n";
import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../app/controller";

export class AccessTokenController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new BadRequestError(i18n`errors.no_token_provided`);
    }

    const payload = await this.authService.decodeRefreshToken(refreshToken);

    const accessToken = await this.authService.retrieveAccessToken({
      id: payload.id,
      name: payload.name,
      role: payload.role,
      username: payload.username,
      jti: payload.jti,
    });

    res.status(201).json({ accessToken });
  };
}
