import { AuthService } from "../../services/auth.service";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { ParentService } from "../../services/parent.service";
import { UserPayload } from "../../interfaces/tokenPayload";
import z from "zod";
import { parseIdParam } from "../../parsers/param/id.parser";

export class DeleteParentController extends Controller<null, UserPayload> {
  constructor(
    private readonly parentService: ParentService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [authGuard(this.authService, Role.ADMIN)];

  public handler: Handler<null, UserPayload> = async (req, res) => {
    const parentId = parseIdParam(req);

    const parent = await this.parentService.delete(parentId);

    res.status(200).json({ parent });
  };
}
