import { executeInDev } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";
import { AccessTokenDto, AccessTokenSchema } from "../../dtos/accessToken.dto";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { validateBodyMiddleware } from "../../middlewares/validateBody";

export class AccessTokenController extends Controller<AccessTokenDto> {
  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [validateBodyMiddleware(AccessTokenSchema)];

  public handler: Handler<AccessTokenDto> = (req, res) => {
    try {
      const payload = this.authService.decodeRefreshToken(req.body.refreshToken);

      const accessToken = this.authService.retrieveAccessToken({
        id: payload.id,
        name: payload.name,
        role: payload.role,
        username: payload.username,
      });

      res.status(201).json({ accessToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }

      executeInDev(() => {
        throw error;
      });

      res.status(500);
    }
  };
}
