import { CreateUserDto, CreateUserSchema } from "../../dtos/users/createUser.dto";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { validateBodyMiddleware } from "../../middlewares/validateBody";
import { Controller, Handler, Middleware } from "../../utils/controller";
import { authGuard } from "../../middlewares/authGuard";
import { Role } from "@prisma/client";
import { isDevelopment, REFRESH_TOKEN_EXP } from "../../config/envVariables";
import ms from "ms";

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "strict",
      maxAge: ms(REFRESH_TOKEN_EXP),
    });

    res.status(201).json({ user });
  };
}
