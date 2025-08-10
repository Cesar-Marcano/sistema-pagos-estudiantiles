import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";
import z from "zod";
import { parseIdParam } from "../../parsers/param/id.parser";

export class GetParentController extends Controller<null, UserPayload> {
  constructor(
    private readonly parentService: ParentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const parentId = parseIdParam(req);

    const result = await this.parentService.findById(parentId);

    res.status(200).json(result);
  };
}
