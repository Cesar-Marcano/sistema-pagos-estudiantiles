import { Paginated } from "../../../../shared/interfaces/paginated";
import { Grade } from "../../../domain/grade.model";

export interface IGradeSearchCriteria {
  query?: {
    name?: string;
    hasLevels?: boolean;
    maxLevel?: number;
    fee?: number;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IGradeRepository {
  create(grade: Grade): Promise<Grade>;

  search(criteria: IGradeSearchCriteria): Promise<Paginated<Grade>>;
  findById(id: number): Promise<Grade>;

  upsert(grade: Grade): Promise<Grade>;

  softDelete(id: number): Promise<Grade>;
  restore(id: number): Promise<Grade>;
}
