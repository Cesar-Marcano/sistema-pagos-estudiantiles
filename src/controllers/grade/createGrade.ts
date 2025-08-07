import { AuthService } from "../../services/auth.service";
import { GradeService } from "../../services/grade.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";
import {
  CreateGradeDto,
  CreateGradeSchema,
} from "../../dtos/grades/createGrade.dto";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateGradeController extends Controller<
  CreateGradeDto,
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
    validateBodyMiddleware(CreateGradeSchema),
  ];

  public handler: Handler<CreateGradeDto, UserPayload> = async (req, res) => {
    const grade = await this.gradeService.createGrade({
      name: req.body.name,
      description: req.body.description!,
      hasLevels: req.body.hasLevels,
      maxLevel: req.body.maxLevel!,
      fee: Decimal(req.body.fee),
      userId: req.user.id,
    });

    res.status(201).json({ grade });
  };
}
