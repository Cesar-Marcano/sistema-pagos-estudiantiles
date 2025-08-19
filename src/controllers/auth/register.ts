import {
  CreateUserDto,
  CreateUserSchema,
} from "../../dtos/users/createUser.dto";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { setRefreshTokenCookie } from "../../shared/utils/cookies";

export class RegisterController extends Controller<CreateUserDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [
    authGuard(this.authService, Role.ADMIN),
    validateBodyMiddleware(CreateUserSchema),
  ];

  public handler: Handler<CreateUserDto> = async (req, res) => {
    const user = await this.userService.createUser(req.body);

    const refreshToken = await this.authService.retrieveRefreshToken({
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.name,
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({ user });
  };
}
