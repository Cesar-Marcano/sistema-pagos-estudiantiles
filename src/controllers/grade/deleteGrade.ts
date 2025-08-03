import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";

export class DeleteGradeController extends Controller<null, UserPayload> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, Role.ADMIN)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const grade = await this.gradeService.deleteGrade(Number(req.params.id));

    res.status(200).json({ grade });
  };
}
