import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import {
  CreateParentDto,
  CreateParentSchema,
} from "../../dtos/parents/createParent.dto";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";

export class CreateParentController extends Controller<
  CreateParentDto,
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
    validateBodyMiddleware(CreateParentSchema),
  ];

  public handler: Handler<CreateParentDto, UserPayload> = async (req, res) => {
    const parent = await this.parentService.createParent({
      document: req.body.document,
      email: req.body.email ?? null,
      fullname: req.body.fullname,
      phoneNumber: req.body.phoneNumber ?? null,
      userId: req.user.id,
    });

    res.status(201).json({ parent });
  };
}
