import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import z from "zod";
import { ConflictError } from "../../errors/conflict.error";
import { i18n } from "../../lang/i18n";
import { UserPayload } from "../../interfaces/tokenPayload";

export class CloseSessionController extends Controller<null, UserPayload> {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any", true)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const sessionIdSchema = z.coerce.number().int().positive();

    const payload = await this.authService.decodeRefreshToken(refreshToken);
    const sessionId = sessionIdSchema.parse(req.params.sessionId);

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
