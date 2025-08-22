import { User } from "../../../core/domain/user.model";
import { UpdateRoleDTO } from "../../../core/dto/user/update.dto";
import { IUpdateRoleFeature } from "../../../core/ports/in/user/updateRole.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";

export class UpdateRoleFeature implements IUpdateRoleFeature {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateRoleDTO): Promise<User> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) throw new Error("UpdateRoleFeature failed: user doesn't exist.");

    user.updateRole(input.role);

    return await this.userRepository.update(user);
  }
}
