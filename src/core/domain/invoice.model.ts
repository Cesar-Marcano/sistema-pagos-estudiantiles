import { Student } from "./student.model";
import { Discount } from "./discount.model";
import { User } from "./user.model";
import { Parent } from "./parent.model";
import { Period } from "./period.model";

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

    private _period: number | Period,

    private _student: number | Student,
    private _parent: number | Parent,

    private _discounts: number[] | Discount[],

    private _createdBy: number | User,

    private _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _invoiceNumber: string,
    _status: InvoiceStatus,
    _subtotal: number,

    _period: number | Period,

    _student: number | Student,
    _parent: number | Parent,

    _discounts: Discount[],

    _createdBy: number | User
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

  public get period(): number | Period {
    return this._period;
  }

  public get student(): number | Student {
    return this._student;
  }

  public get parent(): number | Parent {
    return this._parent;
  }

  public get discounts(): number[] | Discount[] {
    return this._discounts;
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

  public get discountTotal(): number {
    if (this._discounts.every((d) => d instanceof Discount)) {
      return this._discounts.reduce(
        (acc, discount) => acc + discount.calculateAmount(this._subtotal),
        0
      );
    }
    return 0;
  }

  public get total(): number {
    return this.subtotal - this.discountTotal;
  }

  public updateStatus(status: InvoiceStatus): this {
    if (this._status === status) return this;
    this._status = status;
    this._updatedAt = new Date();
    return this;
  }

  public addDiscount(discount: Discount): this {
    if (!Array.isArray(this._discounts)) {
      this._discounts = [];
    }

    if (!discount.id) {
      throw new Error("Required property discount.id");
    }

    if (
      (this._discounts.every((d) => d instanceof Discount) &&
        this._discounts.includes(discount)) ||
      (this._discounts.every((d) => d instanceof Number) &&
        this._discounts.includes(discount.id))
    ) {
      return this;
    }

    if (this._discounts.every((d) => d instanceof Discount)) {
      this._discounts.push(discount);
    } else {
      this._discounts.push(discount.id);
    }

    this._updatedAt = new Date();
    return this;
  }

  public removeDiscount(discountId: number): this {
    if (!Array.isArray(this._discounts)) {
      return this;
    }

    const index = this._discounts.findIndex((d) => {
      if (d instanceof Discount) {
        return d.id === discountId;
      }
      return d === discountId;
    });

    if (index !== -1) {
      this._discounts.splice(index, 1);
      this._updatedAt = new Date();
    }

    return this;
  }

  public delete(): this {
    if (this._deletedAt) return this;
    const now = new Date();
    this._deletedAt = now;
    this._updatedAt = now;
    return this;
  }
}
