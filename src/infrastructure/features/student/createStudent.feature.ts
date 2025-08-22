import { IdentificationDocument } from "../../../core/datavalues/document.datavalue";
import { Student } from "../../../core/domain/student.model";
import { CreateStudentDTO } from "../../../core/dto/student/create.dto";
import { ICreateStudentFeature } from "../../../core/ports/in/student/createStudent.port";
import { IGradeRepository } from "../../../core/ports/out/repositories/grade.repository.port";
import { IParentRepository } from "../../../core/ports/out/repositories/parent.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class CreateStudentFeature implements ICreateStudentFeature {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly gradeRepository: IGradeRepository,
    private readonly parentRepository: IParentRepository
  ) {}

  async execute(input: CreateStudentDTO): Promise<Student> {
    const grade = await this.gradeRepository.findById(input.grade);

    let gradeLevel: number | null = input.gradeLevel;
    let joinGradeLevel: number | null = input.joinGradeLevel;

    if (!grade)
      throw new Error("CreateStudentFeature error: base grade doesn't exist.");

    const joinGrade = await this.gradeRepository.findById(input.joinGrade);

    if (!joinGrade)
      throw new Error("CreateStudentFeature error: join grade doesn't exist.");

    if (!grade.hasLevels && gradeLevel) gradeLevel = null;
    if (!joinGrade.hasLevels && joinGradeLevel) joinGradeLevel = null;

    if (grade.hasLevels && !gradeLevel)
      throw new Error("CreateStudentFeature error: base grade level required.");
    if (joinGrade.hasLevels && !joinGradeLevel)
      throw new Error("CreateStudentFeature error: join grade level required.");

    const parentExists = await this.parentRepository.parentExists(input.parent);
    if (!parentExists)
      throw new Error("CreateStudentFeature error: parent doesn't exist.");

    const document = input.document
      ? new IdentificationDocument(input.document)
      : null;

    const student = Student.create(
      input.fullname,
      input.birthday,
      input.section,
      document,
      input.status,
      input.grade,
      gradeLevel,
      input.joinGrade,
      joinGradeLevel,
      input.joinPeriod,
      input.parent,
      input.createdBy
    );

    return await this.studentRepository.create(student);
  }
}
