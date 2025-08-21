import { User } from "./user.model";

export class Discount {
  constructor(
    private _name: string,
    private _description: string | null,
    private _value: number,
    private _isPercentage: boolean,

    private _createdBy: number,

    private _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _name: string,
    _description: string | null,
    _value: number,
    _isPercentage: boolean,
    _createdBy: number
  ) {
    const name = _name.trim();
    const description = _description?.trim() ?? null;

    if (name.length < 2) {
      throw new Error("Invalid name: must be at least 2 characters long.");
    }

    if (_value <= 0) {
      throw new Error("Invalid value: must be a positive number.");
    }

    if (_isPercentage && _value > 100) {
      throw new Error(
        "Invalid value: Percentage value cannot be greater than 100."
      );
    }

    const now = new Date();

    return new Discount(
      name,
      description,
      _value,
      _isPercentage,
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

  public get description(): string | null {
    return this._description;
  }

  public get value(): number {
    return this._value;
  }

  public get isPercentage(): boolean {
    return this._isPercentage;
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

  public updateName(name: string): this {
    const newName = name.trim();
    if (newName.length < 2) {
      throw new Error("Invalid name: must be at least 2 characters long.");
    }
    if (this._name === newName) return this;
    this._name = newName;
    this._updatedAt = new Date();
    return this;
  }

  public updateDescription(description: string | null): this {
    const newDescription = description?.trim() ?? null;
    if (this._description === newDescription) return this;
    this._description = newDescription;
    this._updatedAt = new Date();
    return this;
  }

  public updateValue(value: number): this {
    if (value <= 0) {
      throw new Error("Invalid value: must be a positive number.");
    }
    if (this._isPercentage && value > 100) {
      throw new Error(
        "Invalid value: Percentage value cannot be greater than 100."
      );
    }
    if (this._value === value) return this;
    this._value = value;
    this._updatedAt = new Date();
    return this;
  }

  public updateIsPercentage(isPercentage: boolean): this {
    if (this._isPercentage === isPercentage) return this;
    if (isPercentage && this._value > 100) {
      throw new Error(
        "Invalid change: Cannot be percentage because value is greater than 100."
      );
    }
    this._isPercentage = isPercentage;
    this._updatedAt = new Date();
    return this;
  }

  public calculateAmount(subtotal: number): number {
    if (this._isPercentage) {
      return (subtotal * this._value) / 100;
    }
    return this._value;
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
