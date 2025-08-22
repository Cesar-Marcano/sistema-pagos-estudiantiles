import { StudentStatus } from "../../domain/student.model";

export class CreateStudentDTO {
  constructor(
    public readonly fullname: string,
    public readonly birthday: Date,
    public readonly section: null,
    public readonly document: string | null,
    public readonly status: StudentStatus,
    public readonly grade: number,
    public readonly gradeLevel: number | null,
    public readonly joinGrade: number,
    public readonly joinGradeLevel: number | null,
    public readonly joinPeriod: number,
    public readonly parent: number,

    public readonly createdBy: number
  ) {}
}
