import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { ConflictError } from "../../errors/conflict.error";
import { i18n } from "../../lang/i18n";
import { UserPayload } from "../../shared/interfaces/tokenPayload";
import { parseIdParam } from "../../shared/utils/parsers/param/id.parser";

export class CloseSessionController extends Controller<null, UserPayload> {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any", true)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const payload = await this.authService.decodeRefreshToken(refreshToken);
    const sessionId = parseIdParam(req, "sessionId");

    const session = await this.authService.getSession(sessionId);

    if (session?.jti === payload.jti) {
      throw new ConflictError(i18n`errors.cannot_close_self_session`);
    }

    const sessionDeleted = await this.authService.closeSession(
      sessionId,
      req.user.id
    );

    res.status(200).json({ sessionDeleted });
  };
}
