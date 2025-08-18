import { Email } from "../datavalues/email.datavalue";
import { Password } from "../datavalues/password.datavalue";
import { Username } from "../datavalues/username.datavalue";
import { IHasherService } from "../ports/out/services/hasher.port";
import { Role } from "./role.model";

export class User {
  constructor(
    private _role: number | Role,
    private _username: string,
    private _name: string,
    private _password: string,
    private _email: string,

    private _createdBy: number | User,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private _id?: number
  ) {}

  public static async create(
    _role: number | Role,
    _username: string,
    _name: string,
    _password: string,
    _email: string,

    _createdBy: number | User,
    hasherService: IHasherService
  ) {
    const username = new Username(_username).value;
    const name = _name.trim();
    const email = new Email(_email).value;
    const validPassword = new Password(_password).value;

    const hashedPassword = await hasherService.hashPassword(validPassword);

    const now = new Date();

    return new User(
      _role,
      username,
      name,
      hashedPassword,
      email,
      _createdBy,
      now,
      now,
      null
    );
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get role(): number | Role {
    return this._role;
  }

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public get hashedPassword(): string {
    return this._password;
  }

  public get createdBy(): number | User {
    return this._createdBy;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public async changePassword(
    val: string,
    hasherService: IHasherService
  ): Promise<this> {
    const password = new Password(val).value;

    if (await hasherService.comparePassword(password, this._password)) {
      return this;
    }

    this._password = await hasherService.hashPassword(password);

    this._updatedAt = new Date();

    return this;
  }

  public updateUsername(val: string): this {
    const username = new Username(val).value;

    this._username = username;

    this._updatedAt = new Date();

    return this;
  }

  public updateName(val: string): this {
    const name = val.trim();

    this._name = name;

    this._updatedAt = new Date();

    return this;
  }

  public updateRole(val: Role | number): this {
    this._role = val;

    this._updatedAt = new Date();

    return this;
  }

  public updateEmail(val: string): this {
    const email = new Email(val).value;

    this._email = email;

    this._updatedAt = new Date();

    return this;
  }

  public delete(): this {
    if (this._deletedAt === null) {
      this._deletedAt = new Date();
      this._updatedAt = this._deletedAt;
    }
    return this;
  }
}
