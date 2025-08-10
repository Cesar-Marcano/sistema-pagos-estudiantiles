import { AuthService } from "../../services/auth.service";
import { StudentService } from "../../services/student.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";
import {
  UpdateStudentDto,
  UpdateStudentSchema,
} from "../../dtos/students/updateStudent.dto";
import { Decimal } from "@prisma/client/runtime/library";
import { parseIdParam } from "../../parsers/param/id.parser";

export class UpdateStudentController extends Controller<
  UpdateStudentDto,
  UserPayload
> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [
    authGuard(this.authService, Role.ADMIN),
    validateBodyMiddleware(UpdateStudentSchema),
  ];

  public handler: Handler<UpdateStudentDto, UserPayload> = async (req, res) => {
    const id = parseIdParam(req);

    const student = await this.studentService.update(id, {
      birthday: req.body.birthday ? new Date(req.body.birthday) : undefined,
      document: req.body.document,
      fullname: req.body.fullname,
      gradeId: req.body.gradeId,
      gradeLevel: req.body.gradeLevel,
      parentId: req.body.parentId,
      section: req.body.section,
      status: req.body.status,
    });

    res.status(200).json({ student });
  };
}
