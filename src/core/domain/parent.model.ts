import { RequireAtLeastOne } from "../../utils/types/common-types";
import { IdentificationDocument } from "../datavalues/document.datavalue";
import { Email } from "../datavalues/email.datavalue";
import { PhoneNumber } from "../datavalues/phonenumber.datavalue";
import { User } from "./user.model";

interface IBaseParent {
  id?: number;
  fullname: string;
  document: string;
  phoneNumber?: string;
  email?: string;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type IParent = RequireAtLeastOne<IBaseParent, "phoneNumber" | "email">;

export type ICreateParent = Omit<
  IParent,
  "createdAt" | "updatedAt" | "deletedAt" | "id"
>;

export class Parent {
  private readonly _id?: number;
  private _fullname: string;
  private _document: string;
  private _phoneNumber?: string;
  private _email?: string;

  private _createdBy: number | User;

  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  private constructor(data: IParent) {
    this._id = data.id;
    this._fullname = data.fullname;
    this._document = data.document;
    this._phoneNumber = data.phoneNumber;
    this._email = data.email;
    this._createdBy = data.createdBy;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._deletedAt = data.deletedAt;
  }

  public static create(data: ICreateParent): Parent {
    const now = new Date();

    const contactData = {
      ...(data.phoneNumber
        ? { phoneNumber: new PhoneNumber(data.phoneNumber).value }
        : {}),
      ...(data.email ? { email: new Email(data.email).value } : {}),
    } as RequireAtLeastOne<
      { phoneNumber?: string; email?: string },
      "phoneNumber" | "email"
    >;

    const newParent: IParent = {
      ...data,
      ...contactData,
      fullname: data.fullname.trim(),
      document: new IdentificationDocument(data.document).value,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    if (newParent.fullname.length < 7) {
      throw new Error("Invalid fullname");
    }

    return new Parent(newParent);
  }

  public static fromDb(data: IParent): Parent {
    return new Parent(data);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get fullname(): string {
    return this._fullname;
  }

  public get document(): string {
    return this._document;
  }

  public get phoneNumber(): string | undefined {
    return this._phoneNumber;
  }

  public get email(): string | undefined {
    return this._email;
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

  public updateFullname(val: string): this {
    const fullname = val.trim();
    if (fullname.length < 7) {
      throw new Error("Invalid fullname");
    }

    this._fullname = fullname;

    this._updatedAt = new Date();

    return this;
  }

  public updateDocument(val: string): this {
    const document = new IdentificationDocument(val).value;

    this._document = document;

    this._updatedAt = new Date();

    return this;
  }

  public updatePhoneNumber(val: string): this {
    const phoneNumber = new PhoneNumber(val).value;

    this._phoneNumber = phoneNumber;

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
