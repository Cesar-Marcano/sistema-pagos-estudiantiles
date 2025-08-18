import { User } from "./user.model";

export class Grade {
  constructor(
    private _name: string,
    private _description: string | null,
    private _hasLevels: boolean,
    private _maxLevel: number | null,
    private _fee: number,

    private _createdBy: number | User,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,

    private readonly _id?: number
  ) {}

  public static create(
    _name: string,
    _description: string | null,
    _hasLevels: boolean,
    _maxLevel: number | null,
    _fee: number,
    _createdBy: number | User
  ): Grade {
    const name = _name.trim();
    let maxLevel = _maxLevel;

    if (name.length < 3) {
      throw new Error("Invalid grade name.");
    }

    if (!_hasLevels) {
      _maxLevel = null;
    } else if (!maxLevel) {
      throw new Error("Required max level not provided.");
    } else if (maxLevel < 1) {
      throw new Error("Max level should be greater than 0");
    } else {
      maxLevel = Math.round(maxLevel);
    }

    if (_fee < 1) {
      throw new Error("Fee should be greater than 0.");
    }

    const now = new Date();

    return new Grade(
      name,
      _description?.trim() ?? null,
      _hasLevels,
      maxLevel,
      _fee,
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

  public get hasLevels(): boolean {
    return this._hasLevels;
  }

  public get maxLevel(): number | null {
    return this._maxLevel;
  }

  public get fee(): number {
    return this._fee;
  }

  public get createdBy(): number | User {
    return this._createdBy;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAtAt(): Date {
    return this._updatedAt;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public updateName(val: string): this {
    const name = val.trim();

    if (name.length < 3) {
      throw new Error("Invalid grade name.");
    }

    this._name = name;

    this._updatedAt = new Date();

    return this;
  }

  public updateDescription(val: string | null): this {
    const description = val?.trim() ?? null;

    this._description = description;

    this._updatedAt = new Date();

    return this;
  }

  public updateHasLevels(val: boolean): this {
    this._hasLevels = val;

    this._updatedAt = new Date();

    return this;
  }

  public updateMaxLevel(val: number): this {
    const maxLevel = Math.round(val);

    if (maxLevel < 1) {
      throw new Error("Max level should be greater than 0");
    }

    this._maxLevel = maxLevel;

    this._updatedAt = new Date();

    return this;
  }

  public updateFee(val: number): this {
    if (val < 1) {
      throw new Error("Fee should be greater than 0");
    }

    this._fee = val;

    this._updatedAt = new Date();

    return this;
  }

  public delete(): this {
    this._deletedAt = new Date();
    this._updatedAt = new Date();

    return this;
  }
}
