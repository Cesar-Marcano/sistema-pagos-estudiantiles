import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import {
  UpdateParentDto,
  UpdateParentSchema,
} from "../../dtos/parents/updateParent.dto";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";
import z from "zod";

export class UpdateParentController extends Controller<
  UpdateParentDto,
  UserPayload
> {
  constructor(
    private readonly parentService: ParentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [
    authGuard(this.authService, Role.ADMIN),
    validateBodyMiddleware(UpdateParentSchema),
  ];

  public handler: Handler<UpdateParentDto, UserPayload> = async (req, res) => {
    const paramsSchema = z.object({
      id: z.coerce.number().int().min(1),
    });

    const { id: parentId } = paramsSchema.parse(req.params);
    const updateData = req.body;

    const parent = await this.parentService.updateParent(parentId, updateData);

    res.status(200).json({ parent });
  };
}
