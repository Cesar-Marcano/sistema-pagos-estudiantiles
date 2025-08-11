import { Email } from "../datavalues/email.datavalue";
import { Password } from "../datavalues/password.datavalue";
import { Username } from "../datavalues/username.datavalue";
import { IHasherService } from "../ports/out/hasher.port";
import { Role } from "./role.model";

export interface IUser {
  id?: number;
  role: number | Role;
  username: string;
  name: string;
  password: string;
  email: string;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ICreateUser = Omit<
  IUser,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  password: string;
};

export class User {
  private _id?: number;
  private _role: number | Role;
  private _username: string;
  private _name: string;
  private _password: string;
  private _email: string;

  private _createdBy: number | User;

  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  private constructor(data: IUser) {
    this._id = data.id;
    this._role = data.role;
    this._username = data.username;
    this._name = data.name;
    this._password = data.password;
    this._email = data.email;
    this._createdBy = data.createdBy;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._deletedAt = data.deletedAt;
  }

  public static async create(data: ICreateUser, hasherService: IHasherService) {
    const username = new Username(data.username).value;
    const name = data.name.trim();
    const email = new Email(data.email).value;
    const validPassword = new Password(data.password).value;

    const hashedPassword = await hasherService.hashPassword(validPassword);

    const now = new Date();

    const userFromDb: IUser = {
      ...data,
      username,
      name,
      email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    return new User(userFromDb);
  }

  public static fromDB(data: IUser): User {
    return new User(data);
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
