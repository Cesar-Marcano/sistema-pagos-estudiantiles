import { User } from "./user.model";

export type Entities =
  | "User"
  | "Student"
  | "Role"
  | "PaymentMethod"
  | "Payment"
  | "Parent"
  | "Invoice"
  | "Grade"
  | "Discount";

export type AuditLogActions = "CREATE" | "UPDATE" | "DELETE";

export interface AuditLog {
  id: number;
  entity: Entities;
  entityId: number;
  action: AuditLogActions;

  performedBy: number | User;

  createdAt: Date;
}
