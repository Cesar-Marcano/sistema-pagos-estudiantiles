import { User } from "../../../core/domain/user.model";
import { UpdateNameDTO } from "../../../core/dto/user/update.dto";
import { IUpdateNameFeature } from "../../../core/ports/in/user/updateName.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";

export class UpdateNameFeature implements IUpdateNameFeature {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateNameDTO): Promise<User> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) throw new Error("UpdateNameFeature failed: user doesn't exist.");

    user.updateName(input.name);

    return await this.userRepository.update(user);
  }
}
