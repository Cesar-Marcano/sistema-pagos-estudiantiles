export class Period {
  constructor(
    private readonly _year: number,
    private readonly _month: number,

    private readonly _createdBy: number,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _year: number,
    _month: number,
    _createdBy: number
  ) {
    if (_year < 1900) {
      throw new Error("Invalid year");
    }

    if (_month < 1 || _month > 12) {
      throw new Error("Invalid month");
    }

    const now = new Date();

    return new Period(_year, _month, _createdBy, now, now, null);
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
    return this.deletedAt;
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
