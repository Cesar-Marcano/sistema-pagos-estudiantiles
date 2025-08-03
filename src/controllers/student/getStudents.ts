import { AuthService } from "../../services/auth.service";
import { StudentService } from "../../services/student.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserPayload } from "../../interfaces/tokenPayload";
import z from "zod";

export class GetStudentsController extends Controller<null, UserPayload> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, "any")];

  public handler: Handler<null, UserPayload> = async (req, res) => {
      const querySchema = z.object({
        page: z.coerce.number().int().min(1).optional().default(1),
        limit: z.coerce.number().int().min(1).max(100).optional().default(10),
      });
  
      const { page, limit } = querySchema.parse(req.query);
  
      const result = await this.studentService.getAllStudents({ page, limit });
  
      res.status(200).json(result);
  };
}
