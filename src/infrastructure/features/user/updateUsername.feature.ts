import { Username } from "../../../core/datavalues/username.datavalue";
import { User } from "../../../core/domain/user.model";
import { UpdateUsernameDTO } from "../../../core/dto/user/update.dto";
import { IUpdateUsernameFeature } from "../../../core/ports/in/user/updateUsername.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";

export class UpdateUsernameFeature implements IUpdateUsernameFeature {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUsernameDTO): Promise<User> {
    const user = await this.userRepository.findById(input.userId);

    if (!user)
      throw new Error("UpdateEmailFeature failed: user doesn't exist.");

    const username = new Username(input.username);
    user.updateUsername(username);

    return await this.userRepository.update(user);
  }
}
