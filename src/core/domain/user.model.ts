import { Email } from "../datavalues/email.datavalue";
import { Password } from "../datavalues/password.datavalue";
import { Username } from "../datavalues/username.datavalue";
import { IHasherService } from "../ports/out/services/hasher.service.port";
import { Role } from "./role.model";

export class User {
  constructor(
    private _role: number,
    private _username: Username,
    private _name: string,
    private _password: Password,
    private _email: Email,

    private _createdBy: number,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private _id?: number
  ) {}

  public static create(
    _role: number,
    _username: Username,
    _name: string,
    _password: Password,
    _email: Email,

    _createdBy: number
  ) {
    const name = _name.trim();
    const now = new Date();

    return new User(
      _role,
      _username,
      name,
      _password,
      _email,
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

  public get role(): number {
    return this._role;
  }

  public get username(): Username {
    return this._username;
  }

  public get email(): Email {
    return this._email;
  }

  public get createdBy(): number {
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
    this._password = await Password.create(val, hasherService);

    this._updatedAt = new Date();

    return this;
  }

  public async comparePassword(
    password: string,
    hasherService: IHasherService
  ): Promise<boolean> {
    return await this._password.compare(password, hasherService);
  }

  public updateUsername(val: Username): this {
    this._username = val;
    this._updatedAt = new Date();

    return this;
  }

  public updateName(val: string): this {
    const name = val.trim();

    this._name = name;

    this._updatedAt = new Date();

    return this;
  }

  public updateRole(val: number): this {
    this._role = val;

    this._updatedAt = new Date();

    return this;
  }

  public updateEmail(val: Email): this {
    this._email = val;
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

  public restore(): this {
    if (this._deletedAt !== null) {
      this._deletedAt = null;
      this._updatedAt = new Date();
    }
    return this;
  }
}
