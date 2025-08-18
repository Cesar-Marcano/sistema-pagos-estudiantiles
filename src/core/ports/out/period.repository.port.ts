import { Paginated } from "../../../shared/interfaces/paginated";
import { Period } from "../../domain/period.model";

export interface IPeriodSearchCriteria {
  query?: {
    id?: number;
    year?: number;
    month?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IPeriodRepository {
  create(period: Period): Promise<Period>;

  search(criteria: IPeriodSearchCriteria): Promise<Paginated<Period>>;
  findById(id: number): Promise<Period>;

  delete(id: number): Promise<Period>;
  restore(id: number): Promise<Period>;
}
