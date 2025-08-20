import { Paginated } from "../../../../shared/interfaces/paginated";
import { Discount } from "../../../domain/discount.model";

export interface IDiscountSearchCriteria {
  query?: {
    name?: string;
    value?: number;
    isPercentage?: boolean;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IDiscountRepository {
  create(discount: Discount): Promise<Discount>;

  search(criteria: IDiscountSearchCriteria): Promise<Paginated<Discount>>;
  findById(id: number): Promise<Discount>;

  upsert(discount: Discount): Promise<Discount>;

  softDelete(id: number): Promise<Discount>;
  restore(id: number): Promise<Discount>;
}
