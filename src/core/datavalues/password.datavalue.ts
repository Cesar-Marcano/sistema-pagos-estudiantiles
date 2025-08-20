import { IHasherService } from "../ports/out/services/hasher.service.port";

export class Password {
  private readonly _hash: string;

  private constructor(hash: string) {
    this._hash = hash;
  }

  public static async create(
    password: string,
    hasherService: IHasherService
  ): Promise<Password> {
    if (!Password.validate(password)) {
      throw new Error("Weak password");
    }
    const hash = await hasherService.hash(password);
    return new Password(hash);
  }

  public static fromHash(hash: string): Password {
    return new Password(hash);
  }

  public async compare(
    password: string,
    hasherService: IHasherService
  ): Promise<boolean> {
    return hasherService.compare(password, this._hash);
  }

  public get hash(): string {
    return this._hash;
  }

  private static validate(password: string): boolean {
    const regExp =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}:;\'"?/<,.~`|\\\]\[-])(?=.{8,})/;
    return regExp.test(password);
  }
}
