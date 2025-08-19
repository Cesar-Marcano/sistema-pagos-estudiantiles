import { Paginated } from "../../../../shared/interfaces/paginated";
import { Payment } from "../../../domain/payment.model";

export interface IPaymentSearchCriteria {
  query?: {
    amount?: number;
    denied?: boolean;
    notes?: string | null;
    paymentMethodId?: number;
    verified?: boolean;
    verifiedAt?: Date | null;
    verifiedByUserId?: number;
    referenceNumber?: string;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IPaymentRepository {
  create(payment: Payment): Promise<Payment>;

  search(criteria: IPaymentSearchCriteria): Promise<Paginated<Payment>>;
  findById(id: number): Promise<Payment>;
  
  upsert(payment: Payment): Promise<Payment>;

  softDelete(id: number): Promise<Payment>;
  restore(id: number): Promise<Payment>;
}
