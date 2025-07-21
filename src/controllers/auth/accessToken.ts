import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../utils/controller";

export class AccessTokenController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("No token provided"); // TODO: Throw custom error
    }

    const payload = this.authService.decodeRefreshToken(refreshToken);

    const accessToken = this.authService.retrieveAccessToken({
      id: payload.id,
      name: payload.name,
      role: payload.role,
      username: payload.username,
    });

    res.status(201).json({ accessToken });
  };
}
