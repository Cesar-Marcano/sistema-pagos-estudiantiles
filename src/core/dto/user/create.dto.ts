export class CreateUserDTO {
  constructor(
    public readonly role: number,
    public readonly username: string,
    public readonly name: string,
    public readonly password: string,
    public readonly email: string,
    public readonly createdBy: number
  ) {}
}
