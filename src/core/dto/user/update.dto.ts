export class UpdateUsernameDTO {
  constructor(
    public readonly userId: number,
    public readonly username: string
  ) {}
}

export class UpdateNameDTO {
  constructor(public readonly userId: number, public readonly name: string) {}
}

export class UpdatePasswordDTO {
  constructor(
    public readonly userId: number,
    public readonly oldPassword: string,
    public readonly newPassword: string
  ) {}
}

export class UpdateEmailDTO {
  constructor(public readonly userId: number, public readonly email: string) {}
}

export class UpdateRoleDTO {
  constructor(public readonly userId: number, public readonly role: number) {}
}
