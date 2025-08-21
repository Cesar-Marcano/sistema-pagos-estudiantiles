import { Email } from "../../../core/datavalues/email.datavalue";
import { User } from "../../../core/domain/user.model";
import { UpdateEmailDTO } from "../../../core/dto/user/update.dto";
import { IUpdateEmailFeature } from "../../../core/ports/in/user/updateEmail.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";

export class UpdateEmailFeature implements IUpdateEmailFeature {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateEmailDTO): Promise<User> {
    const user = await this.userRepository.findById(input.userId);

    if (!user)
      throw new Error("UpdateEmailFeature failed: user doesn't exist.");

    const email = new Email(input.email);
    user.updateEmail(email);

    return await this.userRepository.update(user);
  }
}
