import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../shared/interfaces/tokenPayload";
import {
  CreateStudentDto,
  CreateStudentSchema,
} from "../../dtos/students/createStudent.dto";
import { StudentService } from "../../services/student.service";

export class CreateStudentController extends Controller<
  CreateStudentDto,
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
    validateBodyMiddleware(CreateStudentSchema),
  ];

  public handler: Handler<CreateStudentDto, UserPayload> = async (req, res) => {
    const parent = await this.studentService.create({
      birthday: new Date(req.body.birthday),
      document: req.body.document!,
      fullname: req.body.fullname,
      gradeId: req.body.gradeId,
      gradeLevel: req.body.gradeLevel!,
      parentId: req.body.parentId,
      section: req.body.section!,
      status: req.body.status,
      userId: req.user.id,
    });

    res.status(201).json({ parent });
  };
}
