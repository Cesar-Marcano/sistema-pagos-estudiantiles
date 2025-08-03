import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../interfaces/tokenPayload";

export class GetGradeController extends Controller<null, UserPayload> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const grade = await this.gradeService.getGrade(Number(req.params.id));

    res.status(200).json({ grade });
  };
}
