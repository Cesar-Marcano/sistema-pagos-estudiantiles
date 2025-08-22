import { User } from "../../../core/domain/user.model";
import { UpdatePasswordDTO } from "../../../core/dto/user/update.dto";
import { IUpdatePasswordFeature } from "../../../core/ports/in/user/updatePassword.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";
import { IHasherService } from "../../../core/ports/out/services/hasher.service.port";

export class UpdatePasswordFeature implements IUpdatePasswordFeature {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService
  ) {}

  async execute(input: UpdatePasswordDTO): Promise<User> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) throw new Error("UpdatePasswordFeature failed: user doesn't exist.");

    user.changePassword(input.newPassword, this.hasherService);

    return await this.userRepository.update(user);
  }
}
