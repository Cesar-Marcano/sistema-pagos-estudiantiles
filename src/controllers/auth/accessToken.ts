import { validateBodyWrapper } from "../../utils/validateBodyWrapper";
import { executeInDev } from "../../config/envVariables";
import { AuthService } from "../../services/auth.service";
import { AccessTokenSchema } from "../../dtos/accessToken.dto";

export const accessTokenController = (authService: AuthService) =>
  validateBodyWrapper(AccessTokenSchema, async (req, res) => {
    try {
      const payload = authService.decodeRefreshToken(req.body.refreshToken);

      const accessToken = authService.retrieveAccessToken({
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
  });
