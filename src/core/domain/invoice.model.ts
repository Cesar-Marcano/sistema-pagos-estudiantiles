import { Student } from "./student.model";
import { Discount } from "./discount.model";
import { User } from "./user.model";
import { Parent } from "./parent.model";

export enum InvoiceStatus {
  Pending,
  Paid,
  Cancelled,
}

export interface IPeriod {
  year: number;
  month: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: number;
  discountTotal: number;
  total: number;

  period: IPeriod | string;

  student: number | Student;
  parent: number | Parent;

  discounts: number[] | Discount[];

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
