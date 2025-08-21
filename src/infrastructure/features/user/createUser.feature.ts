import { Email } from "../../../core/datavalues/email.datavalue";
import { Password } from "../../../core/datavalues/password.datavalue";
import { Username } from "../../../core/datavalues/username.datavalue";
import { User } from "../../../core/domain/user.model";
import { CreateUserDTO } from "../../../core/dto/user/create.dto";
import { ICreateUserFeature } from "../../../core/ports/in/user/createUser.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";
import { IHasherService } from "../../../core/ports/out/services/hasher.service.port";

export class CreateUserFeature implements ICreateUserFeature {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService
  ) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const username = new Username(input.username);
    const password = await Password.create(input.password, this.hasherService);
    const email = new Email(input.email);

    const user = User.create(
      input.role,
      username,
      input.name,
      password,
      email,
      input.createdBy
    );

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
