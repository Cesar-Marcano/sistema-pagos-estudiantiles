import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../shared/interfaces/tokenPayload";

export class GetGradesController extends Controller<null, UserPayload> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const grades = await this.gradeService.findAll();

    res.status(200).json({ grades });
  };
}
