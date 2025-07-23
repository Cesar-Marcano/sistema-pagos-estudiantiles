import { Controller, Handler, Middleware } from "../../utils/controller";
import { isDevelopment } from "../../config/envVariables";

export class LogoutController extends Controller {
  constructor() {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (req, res) => {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "strict",
      maxAge: 0,
    });

    res.status(200);
  };
}
