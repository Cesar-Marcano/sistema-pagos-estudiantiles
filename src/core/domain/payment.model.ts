import { Invoice } from "./invoice.model";
import { PaymentMethod } from "./paymentMethod.model";
import { User } from "./user.model";

export class Payment {
  constructor(
    private _amount: number,
    private _denied: boolean,
    private _notes: string | null,

    private _paymentMethod: number | PaymentMethod,

    private _invoice: number | Invoice,

    private _verified: boolean | null,
    private _verifiedAt: Date | null,
    private _verifiedBy: (number | User) | null,

    private _referenceNumber: string | null,

    private _createdBy: number | User,

    private _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {}

  public static create(
    _amount: number,
    _notes: string | null,

    _paymentMethod: PaymentMethod,

    _invoice: number | Invoice,

    _verified: boolean | null,
    _verifiedAt: Date | null,
    _verifiedBy: (number | User) | null,

    _referenceNumber: string | null,

    _createdBy: number | User
  ) {
    if (_amount < 1) {
      throw new Error("Invalid amount");
    }

    const notes = _notes?.trim() ?? null;
    const referenceNumber = _referenceNumber?.trim() ?? null;

    if (notes && notes.length < 2) {
      throw new Error("Invalid notes");
    }

    if (referenceNumber && referenceNumber.length < 2) {
      throw new Error("Invalid reference number");
    }

    if (_paymentMethod instanceof PaymentMethod) {
      if (_paymentMethod.requiresManualVerification && _verified === null) {
        throw new Error("Verified needs to be true or false but not null");
      }

      if (_paymentMethod.requiresReferenceNumber && _referenceNumber === null) {
        throw new Error("Reference number needs to be filled");
      }

      if (
        !_paymentMethod.requiresReferenceNumber &&
        _referenceNumber !== null
      ) {
        throw new Error("Reference number needs to be null");
      }

      if (
        !_paymentMethod.requiresManualVerification &&
        (_verified !== null || _verifiedAt !== null || _verifiedBy !== null)
      ) {
        throw new Error(
          "Verified, verified at and verified by needs to be null"
        );
      }
    }

    const now = new Date();

    return new Payment(
      _amount,
      false,
      notes,
      _paymentMethod,
      _invoice,
      _verified,
      _verifiedAt,
      _verifiedBy,
      referenceNumber,
      _createdBy,
      now,
      now,
      null
    );
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get amount(): number {
    return this._amount;
  }

  public get denied(): boolean {
    return this._denied;
  }

  public get notes(): string | null {
    return this._notes;
  }

  public get paymentMethod(): number | PaymentMethod {
    return this._paymentMethod;
  }

  public get invoice(): number | Invoice {
    return this.invoice;
  }

  public get verified(): boolean | null {
    return this._verified;
  }

  public get verifiedAt(): Date | null {
    return this._verifiedAt;
  }

  public get verifiedBy(): (number | User) | null {
    return this._verifiedBy;
  }

  public get referenceNumber(): string | null {
    return this._referenceNumber;
  }

  public get createdBy(): number | User {
    return this._createdBy;
  }

  public createdAt(): Date {
    return this._createdAt;
  }

  public updatedAt(): Date {
    return this._updatedAt;
  }

  public deletedAt(): Date | null {
    return this._deletedAt;
  }

  public updateAmount(val: number): this {
    if (val < 1) {
      throw new Error("Invalid amount");
    }

    if (this._amount === val) return this;

    this._amount = val;
    this._updatedAt = new Date();

    return this;
  }

  public updateDenied(val: boolean): this {
    if (this._denied === val) {
      return this;
    }

    this._denied = val;
    this._updatedAt = new Date();

    return this;
  }

  public updateNotes(val: string): this {
    const notes = val.trim();

    if (notes.length < 2) {
      throw new Error("Invalid notes");
    }

    this._notes = notes;
    this._updatedAt = new Date();

    return this;
  }

  public updateVerified(
    verified: false,
    verifiedAt?: null,
    verifiedBy?: null
  ): this;

  public updateVerified(
    verified: true,
    verifiedAt: Date,
    verifiedBy: number | User
  ): this;

  public updateVerified(
    verified: boolean,
    verifiedAt?: Date | null,
    verifiedBy?: (number | User) | null
  ): this {
    if (verified === false) {
      if (this._verified === verified) {
        return this;
      }

      this._verified = verified;
      this._updatedAt = new Date();

      return this;
    }

    if (!verifiedAt || !verifiedBy) {
      throw new Error("Verified at and verified by are required");
    }

    this._verified = verified;
    this._verifiedAt = verifiedAt;
    this._verifiedBy = verifiedBy;

    this._updatedAt = new Date();

    return this;
  }

  public updateReferenceNumber(val: string): this {
    const referenceNumber = val.trim();

    if (referenceNumber.length < 2) {
      throw new Error("Invalid reference number");
    }

    this._referenceNumber = referenceNumber;
    this._updatedAt = new Date();

    return this;
  }

  public delete(): this {
    const now = new Date();

    this._deletedAt = now;
    this._updatedAt = now;

    return this;
  }
}
