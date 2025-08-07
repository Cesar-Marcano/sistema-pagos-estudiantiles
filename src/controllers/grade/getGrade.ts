import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../interfaces/tokenPayload";
import { parseIdParam } from "../../parsers/param/id.parser";

export class GetGradeController extends Controller<null, UserPayload> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const id = parseIdParam(req);
    const grade = await this.gradeService.getGrade(id);

    res.status(200).json({ grade });
  };
}
