import { Paginated } from "../../../shared/interfaces/paginated";
import { Student, StudentStatus } from "../../domain/student.model";

export interface IStudentSearchCriteria {
  query?: {
    id?: number;
    fullname?: string;
    birthday?: Date;
    document?: string;
    status?: StudentStatus;
    gradeId?: number;
    gradeLevel?: number;
    joinGradeId?: number;
    joinGradeLevelId?: number;
    joinPeriodId?: number;
    discountsId?: number[];
    parentId?: number;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IStudentRepository {
  create(student: Student): Promise<Student>;

  search(criteria: IStudentSearchCriteria): Promise<Paginated<Student>>;
  findById(id: number): Promise<Student>;

  upsert(student: Student): Promise<Student>;

  softDelete(id: number): Promise<Student>;
  restore(id: number): Promise<Student>;
}
