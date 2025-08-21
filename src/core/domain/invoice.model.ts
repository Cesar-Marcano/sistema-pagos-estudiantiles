export enum InvoiceStatus {
  Pending,
  Paid,
  Cancelled,
}

export class Invoice {
  constructor(
    private _invoiceNumber: string,
    private _status: InvoiceStatus,
    private _subtotal: number,

    private _period: number,

    private _student: number,
    private _parent: number,

    private _discounts: number[],

    private _createdBy: number,

    private _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _invoiceNumber: string,
    _status: InvoiceStatus,
    _subtotal: number,

    _period: number,

    _student: number,
    _parent: number,

    _discounts: number[],

    _createdBy: number
  ) {
    const invoiceNumber = _invoiceNumber.trim();

    if (invoiceNumber.length < 2) {
      throw new Error("Invalid invoice number");
    }

    if (_subtotal < 0) {
      throw new Error("Invalid subtotal");
    }

    const now = new Date();

    return new Invoice(
      invoiceNumber,
      _status,
      _subtotal,
      _period,
      _student,
      _parent,
      _discounts,
      _createdBy,
      now,
      now,
      null
    );
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get invoiceNumber(): string {
    return this._invoiceNumber;
  }

  public get status(): InvoiceStatus {
    return this._status;
  }

  public get subtotal(): number {
    return this._subtotal;
  }

  public get period(): number {
    return this._period;
  }

  public get student(): number {
    return this._student;
  }

  public get parent(): number {
    return this._parent;
  }

  public get discounts(): number[] {
    return this._discounts;
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

  public updateStatus(status: InvoiceStatus): this {
    if (this._status === status) return this;
    this._status = status;
    this._updatedAt = new Date();
    return this;
  }

  public addDiscount(discount: number): this {
    if (!this._discounts.includes(discount)) {
      this._discounts.push(discount);
      this._updatedAt = new Date();
    }

    return this;
  }

  public removeDiscount(discount: number): this {
    const initialLength = this._discounts.length;
    this._discounts = this._discounts.filter((d) => d !== discount);

    if (this._discounts.length < initialLength) {
      this._updatedAt = new Date();
    }

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
