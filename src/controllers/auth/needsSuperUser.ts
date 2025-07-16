import { UserService } from "../../services/user.service";
import { Controller, Handler, Middleware } from "../../utils/controller";

export class NeedsSuperUserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  public middlewares: Middleware[] = [];

  public handler: Handler = async (_req, res) => {
    const adminExists = await this.userService.adminExists();

    res.status(200).json({ needsSuperUser: !adminExists });
  };
}
