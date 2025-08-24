import { Student } from "../../../core/domain/student.model";
import { UpdateJoinGradeLevelDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentJoinGradeLevelFeature } from "../../../core/ports/in/student/updateStudentJoinGradeLevel.port";
import { IGradeRepository } from "../../../core/ports/out/repositories/grade.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentJoinGradeLevelFeature
  implements IUpdateStudentJoinGradeLevelFeature
{
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly gradeRepository: IGradeRepository
  ) {}

  async execute(input: UpdateJoinGradeLevelDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentJoinGradeLevel error: student not found.");

    const joinGrade = await this.gradeRepository.findById(student.joinGrade);

    if (!joinGrade)
      throw new Error("UpdateStudentJoinGradeLevel error: grade not found.");

    if (!joinGrade.hasLevels) {
      // Auto-correcting data inconsistency: grade has no levels but student has a gradeLevel
      if (student.joinGradeLevel !== null) {
        student.updateJoinGradeLevel(null);

        return await this.studentRepository.update(student);
      }

      throw new Error(
        "UpdateStudentJoinGradeLevel error: grade has no levels."
      );
    }

    if (
      joinGrade.maxLevel &&
      (input.joinGradeLevel < 1 || input.joinGradeLevel > joinGrade.maxLevel)
    ) {
      throw new Error(
        `UpdateStudentJoinGradeLevel error: grade level must be between 1 and ${joinGrade.maxLevel}.`
      );
    }

    student.updateJoinGradeLevel(input.joinGradeLevel);

    return await this.studentRepository.update(student);
  }
}
