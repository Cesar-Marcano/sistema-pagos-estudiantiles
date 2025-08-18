import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../shared/interfaces/tokenPayload";

export class GetUserSessionsController extends Controller<null, UserPayload> {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const userId = req.user.id;

    const sessions = await this.authService.getUserSessions(userId);

    res.status(200).json({ sessions });
  };
}
