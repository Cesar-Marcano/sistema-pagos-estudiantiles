import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";
import {
  UpdateGradeDto,
  UpdateGradeSchema,
} from "../../dtos/grades/updateGrade.dto";
import { Decimal } from "@prisma/client/runtime/library";
import { parseIdParam } from "../../parsers/param/id.parser";

export class UpdateGradeController extends Controller<
  UpdateGradeDto,
  UserPayload
> {
  constructor(
    private readonly gradeService: GradeService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [
    authGuard(this.authService, Role.ADMIN),
    validateBodyMiddleware(UpdateGradeSchema),
  ];

  public handler: Handler<UpdateGradeDto, UserPayload> = async (req, res) => {
    const id = parseIdParam(req);
    const grade = await this.gradeService.updateGrade(id, {
      name: req.body.name,
      description: req.body.description!,
      hasLevels: req.body.hasLevels,
      maxLevel: req.body.maxLevel!,
      fee: req.body.fee ? Decimal(req.body.fee) : undefined,
      userId: req.user.id,
    });

    res.status(200).json({ grade });
  };
}
