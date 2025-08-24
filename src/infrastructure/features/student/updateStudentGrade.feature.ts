import { Student } from "../../../core/domain/student.model";
import { UpdateGradeDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentGradeFeature } from "../../../core/ports/in/student/updateStudentGrade.port";
import { IGradeRepository } from "../../../core/ports/out/repositories/grade.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentGradeFeature implements IUpdateStudentGradeFeature {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly gradeRepository: IGradeRepository
  ) {}

  async execute(input: UpdateGradeDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentGrade error: student not found.");

    const grade = await this.gradeRepository.findById(input.grade);

    if (!grade) throw new Error("UpdateStudentGrade error: grade not found.");

    student.updateGrade(input.grade);

    if (grade.hasLevels) {
      if (!input.gradeLevel)
        throw new Error(
          "UpdateStudentGrade error: the grade has levels and field grade level is required."
        );

      if (
        input.gradeLevel < 1 ||
        (grade.maxLevel && input.gradeLevel > grade.maxLevel)
      ) {
        throw new Error(
          `UpdateStudentGrade error: grade level must be between 1 and ${grade.maxLevel}.`
        );
      }

      student.updateGradeLevel(input.gradeLevel);
    }

    return await this.studentRepository.update(student);
  }
}
