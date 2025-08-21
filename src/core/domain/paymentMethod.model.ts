export class PaymentMethod {
  constructor(
    private _name: string,
    private _description: string | null,
    private _requiresManualVerification: boolean,
    private _requiresReferenceNumber: boolean,

    private _createdBy: number,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _name: string,
    _description: string | null,
    _requiresManualVerification: boolean,
    _requiresReferenceNumber: boolean,
    _createdBy: number
  ) {
    const name = _name.trim();
    const description = _description?.trim() ?? null;

    if (name.length < 3) {
      throw new Error("Invalid name");
    }

    if (description && description.length < 2) {
      throw new Error("Invalid description");
    }

    const now = new Date();

    return new PaymentMethod(
      name,
      description,
      _requiresManualVerification,
      _requiresReferenceNumber,
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

  public get requiresManualVerification(): boolean {
    return this._requiresManualVerification;
  }

  public get requiresReferenceNumber(): boolean {
    return this._requiresReferenceNumber;
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

  public updateName(val: string): this {
    const name = val.trim();

    if (name.length < 3) {
      throw new Error("Invalid name");
    }

    this._name = name;
    this._updatedAt = new Date();

    return this;
  }

  public updateDescription(val: string): this {
    const description = val.trim();

    if (description.length < 2) {
      throw new Error("Invalid description");
    }

    this._description = description;
    this._updatedAt = new Date();

    return this;
  }

  public updateRequiresManualVerification(val: boolean): this {
    if (val === this._requiresManualVerification) {
      return this;
    }

    this._requiresManualVerification = val;
    this._updatedAt = new Date();

    return this;
  }
  public updateRequiresReferenceNumber(val: boolean): this {
    if (val === this._requiresReferenceNumber) {
      return this;
    }

    this._requiresReferenceNumber = val;
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
