import { User } from "./user.model";

export class Period {
  constructor(
    private readonly _year: number,
    private readonly _month: number,

    private readonly _createdBy: number | User,

    private readonly _createdAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _year: number,
    _month: number,
    _createdBy: User | number
  ) {
    if (_year < 1900) {
      throw new Error("Invalid year");
    }

    if (_month < 1 || _month > 12) {
      throw new Error("Invalid month");
    }

    return new Period(_year, _month, _createdBy, new Date(), null);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get month(): number {
    return this._month;
  }

  public get year(): number {
    return this._year;
  }

  public get createdBy(): number | User {
    return this._createdBy;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get deletedAt(): Date | null {
    return this.deletedAt;
  }

  public delete(): this {
    this._deletedAt = new Date();

    return this;
  }
}
