import { IdentificationDocument } from "../datavalues/document.datavalue";
import { Email } from "../datavalues/email.datavalue";
import { PhoneNumber } from "../datavalues/phonenumber.datavalue";

export class Parent {
  constructor(
    private _fullname: string,
    private _document: string,
    private _phoneNumber: string | null,
    private _email: string | null,

    private _createdBy: number,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _fullname: string,
    _document: string,
    _phoneNumber: string | null,
    _email: string | null,
    _createdBy: number
  ): Parent {
    const now = new Date();

    if (!_email && !_phoneNumber) {
      throw new Error("Email or phone number required.");
    }

    const phoneNumber = !_phoneNumber
      ? null
      : new PhoneNumber(_phoneNumber).value;

    const email = !_email ? null : new Email(_email).value;

    const fullname = _fullname.trim();
    const document = new IdentificationDocument(_document).value;

    if (fullname.length < 7) {
      throw new Error("Invalid fullname");
    }

    return new Parent(
      fullname,
      document,
      phoneNumber,
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

  public get fullname(): string {
    return this._fullname;
  }

  public get document(): string {
    return this._document;
  }

  public get phoneNumber(): string | null {
    return this._phoneNumber;
  }

  public get email(): string | null {
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

  public restore(): this {
    if (this._deletedAt !== null) {
      this._deletedAt = null;
      this._updatedAt = new Date();
    }
    return this;
  }
}
