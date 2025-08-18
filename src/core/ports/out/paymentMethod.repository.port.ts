import { Paginated } from "../../../shared/interfaces/paginated";
import { PaymentMethod } from "../../domain/paymentMethod.model";

export interface IPaymentMethodSearchCriteria {
  query?: {
    name?: number;
    requiresManualVerification?: boolean;
    requiresReferenceNumber?: boolean;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IPaymentMethodRepository {
  create(paymentMethod: PaymentMethod): Promise<PaymentMethod>;

  search(
    criteria: IPaymentMethodSearchCriteria
  ): Promise<Paginated<PaymentMethod>>;
  findById(id: number): Promise<PaymentMethod>;

  upsert(paymentMethod: PaymentMethod): Promise<PaymentMethod>;

  delete(id: number): Promise<PaymentMethod>;
  restore(id: number): Promise<PaymentMethod>;
}
