import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../app/controller";
import {
  CreateSuperUserDto,
  CreateSuperUserSchema,
} from "../../dtos/users/createSuperUser.dto";
import { setRefreshTokenCookie } from "../../utils/cookies";

export class CreateSuperUserController extends Controller<CreateSuperUserDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super();
  }

  public middlewares: Middleware[] = [
    validateBodyMiddleware(CreateSuperUserSchema),
  ];

  public handler: Handler<CreateSuperUserDto> = async (req, res) => {
    const user = await this.userService.createSuperuser(
      req.body.username,
      req.body.password,
      req.body.name
    );

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
