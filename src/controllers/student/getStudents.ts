import { AuthService } from "../../services/auth.service";
import { StudentService } from "../../services/student.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../interfaces/tokenPayload";
import { parsePaginationQuery } from "../../parsers/query/pagination.query";

export class GetStudentsController extends Controller<null, UserPayload> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const { page, limit } = parsePaginationQuery(req);

    const result = await this.studentService.getAllStudents({ page, limit });

    res.status(200).json(result);
  };
}
