import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";
import z from "zod";

export class DeleteParentController extends Controller<null, UserPayload> {
  constructor(
    private readonly parentService: ParentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, Role.ADMIN)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const paramsSchema = z.object({
      id: z.coerce.number().int().min(1),
    });

    const { id: parentId } = paramsSchema.parse(req.params);

    const parent = await this.parentService.deleteParent(parentId);

    res.status(200).json({ parent });
  };
}
