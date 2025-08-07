import { AuthService } from "../../services/auth.service";
import { StudentService } from "../../services/student.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { UserPayload } from "../../interfaces/tokenPayload";
import { parseIdParam } from "../../parsers/param/id.parser";

export class DeleteStudentController extends Controller<null, UserPayload> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, Role.ADMIN)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const id = parseIdParam(req);
    const student = await this.studentService.deleteStudent(id);

    res.status(200).json({ student });
  };
}
