import { User } from "../../../core/domain/user.model";
import { LoginDTO } from "../../../core/dto/user/login.dto";
import { ILoginFeature } from "../../../core/ports/in/user/login.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";
import { IHasherService } from "../../../core/ports/out/services/hasher.service.port";

export class LoginFeature implements ILoginFeature {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService
  ) {}

  async execute(input: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByUsername(input.username);

    if (!user) throw new Error("AuthError: wrong user/password.");

    const isPasswordValid = await user.comparePassword(
      input.password,
      this.hasherService
    );

    if (!isPasswordValid)
      throw new Error("AuthError: wrong user/password.");

    return user;
  }
}
