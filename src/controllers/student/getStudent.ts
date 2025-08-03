import { AuthService } from "../../services/auth.service";
import { StudentService } from "../../services/student.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../interfaces/tokenPayload";

export class GetStudentController extends Controller<null, UserPayload> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const student = await this.studentService.getStudentById(Number(req.params.id));

    res.status(200).json({ student });
  };
}
