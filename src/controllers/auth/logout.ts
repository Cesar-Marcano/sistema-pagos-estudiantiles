import { Controller, Handler, Middleware } from "../../utils/controller";
import { isDevelopment } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";

export class LogoutController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "strict",
      maxAge: 0,
    });

    const payload = await this.authService.decodeRefreshToken(refreshToken);

    await this.authService.logout(payload.jti, payload.id);

    res.status(200).json({});
  };
}
