import { Discount } from "./discount.model";
import { Grade, GradeWithLevels, GradeWithoutLevels } from "./grade.model";
import { IPeriod } from "./invoice.model";
import { Parent } from "./parent.model";
import { User } from "./user.model";

export enum StudentStatus {
  Active,
  Inactive,
}

interface RawStudent {
  id: number;
  fullname: string;
  birthday: Date;
  section?: string;
  document?: string;
  status: StudentStatus;

  grade: number | Grade;
  gradeLevel?: number | never;
  
  joinGrade: number | Grade;
  joinGradeLevel?: number | never;
  joinPeriod: IPeriod;

  discounts: number[] | Discount[];

  parent: number | Parent;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StudentWithGradeWithoutLevels extends RawStudent {
  grade: number | GradeWithoutLevels;
  gradeLevel?: never;
}

export interface StudentWithGradeWithLevels extends RawStudent {
  grade: number | GradeWithLevels;
  gradeLevel: number;
}

export type Student =
  | StudentWithGradeWithLevels
  | StudentWithGradeWithoutLevels;
