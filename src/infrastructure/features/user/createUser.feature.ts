import { inject, injectable } from "inversify";
import { Email } from "../../../core/datavalues/email.datavalue";
import { Password } from "../../../core/datavalues/password.datavalue";
import { Username } from "../../../core/datavalues/username.datavalue";
import { User } from "../../../core/domain/user.model";
import { CreateUserDTO } from "../../../core/dto/user/create.dto";
import { ICreateUserFeature } from "../../../core/ports/in/user/createUser.port";
import { IRoleRepository } from "../../../core/ports/out/repositories/role.repository.port";
import { IUserRepository } from "../../../core/ports/out/repositories/user.repository.port";
import { IHasherService } from "../../../core/ports/out/services/hasher.service.port";

@injectable()
export class CreateUserFeature implements ICreateUserFeature {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
    @inject("IRoleRepository")
    private readonly roleRepository: IRoleRepository,
    @inject("IHasherService")
    private readonly hasherService: IHasherService
  ) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const username = new Username(input.username);
    const password = await Password.create(input.password, this.hasherService);
    const email = new Email(input.email);

    const roleExists = await this.roleRepository.roleExists(input.role);

    if (!roleExists)
      throw new Error("CreateUserFeature error: the role doesn't exist.");

    const user = User.create(
      input.role,
      username,
      input.name,
      password,
      email,
      null
    );

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
