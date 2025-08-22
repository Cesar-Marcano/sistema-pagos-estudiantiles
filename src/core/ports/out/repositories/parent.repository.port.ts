import { Paginated } from "../../../../shared/interfaces/paginated";
import { Parent } from "../../../domain/parent.model";

export interface IParentSearchCriteria {
  query?: {
    fullname?: string;
    document?: string;
    phoneNumber?: string;
    email?: string;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IParentRepository {
  create(parent: Parent): Promise<Parent>;

  search(criteria: IParentSearchCriteria): Promise<Paginated<Parent>>;
  findById(id: number): Promise<Parent>;

  upsert(parent: Parent): Promise<Parent>;

  parentExists(id: number): Promise<boolean>;

  softDelete(id: number): Promise<Parent>;
  restore(id: number): Promise<Parent>;
}
