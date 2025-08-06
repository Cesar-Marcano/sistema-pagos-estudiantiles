import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";
import { parsePaginationQuery } from "../../parsers/query/pagination.query";

export class GetParentsController extends Controller<null, UserPayload> {
  constructor(
    private readonly parentService: ParentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const { page, limit } = parsePaginationQuery(req);

    const result = await this.parentService.getAllParents({ page, limit });

    res.status(200).json(result);
  };
}
