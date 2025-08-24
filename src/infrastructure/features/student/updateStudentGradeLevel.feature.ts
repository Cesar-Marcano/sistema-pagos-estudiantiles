import { Student } from "../../../core/domain/student.model";
import { UpdateGradeLevelDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentGradeLevelFeature } from "../../../core/ports/in/student/updateStudentGradeLevel.port";
import { IGradeRepository } from "../../../core/ports/out/repositories/grade.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentGradeLevelFeature
  implements IUpdateStudentGradeLevelFeature
{
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly gradeRepository: IGradeRepository
  ) {}

  async execute(input: UpdateGradeLevelDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentGradeLevel error: student not found.");

    const grade = await this.gradeRepository.findById(student.grade);

    if (!grade)
      throw new Error("UpdateStudentGradeLevel error: grade not found.");

    if (!grade.hasLevels) {
      // Auto-correcting data inconsistency: grade has no levels but student has a gradeLevel
      if (student.gradeLevel !== null) {
        student.updateGradeLevel(null);

        return await this.studentRepository.update(student);
      }

      throw new Error("UpdateStudentGradeLevel error: grade has no levels.");
    }

    if (
      grade.maxLevel &&
      (input.gradeLevel < 1 || input.gradeLevel > grade.maxLevel)
    ) {
      throw new Error(
        `UpdateStudentGradeLevel error: grade level must be between 1 and ${grade.maxLevel}.`
      );
    }

    student.updateGradeLevel(input.gradeLevel);

    return await this.studentRepository.update(student);
  }
}
