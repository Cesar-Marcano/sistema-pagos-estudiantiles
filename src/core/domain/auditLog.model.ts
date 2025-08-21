export type Entities =
  | "User"
  | "Student"
  | "Role"
  | "Period"
  | "Payment"
  | "PaymentMethod"
  | "Parent"
  | "Invoice"
  | "Grade"
  | "Discount";

export type AuditLogActions = "CREATE" | "UPDATE" | "DELETE";

export class AuditLog {
  constructor(
    private _entity: Entities,
    private _entityId: number,
    private _action: AuditLogActions,
    private _changes: string,

    private _performedBy: number,

    private _createdAt: Date,
    private readonly _id: number
  ) {}

  public get id(): number {
    return this._id;
  }

  public get entity(): Entities {
    return this._entity;
  }

  public get entityId(): number {
    return this._entityId;
  }

  public get action(): AuditLogActions {
    return this._action;
  }

  public get changes(): string {
    return this._changes;
  }

  public get performedBy(): number {
    return this._performedBy;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
