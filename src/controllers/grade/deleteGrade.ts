import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";
import { parseIdParam } from "../../parsers/param/id.parser";

export class DeleteGradeController extends Controller<null, UserPayload> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, Role.ADMIN)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const id = parseIdParam(req);
    const grade = await this.gradeService.deleteGrade(id);

    res.status(200).json({ grade });
  };
}
