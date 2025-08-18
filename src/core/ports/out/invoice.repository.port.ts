import { InvoiceStatus } from "@prisma/client";
import { Paginated } from "../../../shared/interfaces/paginated";
import { Invoice } from "../../domain/invoice.model";

export interface IInvoiceSearchCriteria {
  query?: {
    invoiceNumber?: string;
    invoiceStatus?: InvoiceStatus;
    subtotal?: number;
    periodId?: number;
    studentId?: number;
    parentId?: number;
    includingDiscountsId?: number[];
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IInvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>;
  
  search(criteria: IInvoiceSearchCriteria): Promise<Paginated<Invoice>>;
  findById(id: number): Promise<Invoice>;
  
  upsert(invoice: Invoice): Promise<Invoice>;

  delete(id: number): Promise<Invoice>;
  restore(id: number): Promise<Invoice>;
}
