import { Student } from "../../../core/domain/student.model";
import { UpdateJoinGradeDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentJoinGradeFeature } from "../../../core/ports/in/student/updateStudentJoinGrade.port";
import { IGradeRepository } from "../../../core/ports/out/repositories/grade.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentJoinGradeFeature
  implements IUpdateStudentJoinGradeFeature
{
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly gradeRepository: IGradeRepository
  ) {}

  async execute(input: UpdateJoinGradeDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentJoinGrade error: student not found.");

    const joinGrade = await this.gradeRepository.findById(input.joinGrade);

    if (!joinGrade)
      throw new Error("UpdateStudentJoinGrade error: grade not found.");

    student.updateJoinGrade(input.joinGrade);

    if (joinGrade.hasLevels) {
      if (!input.joinGradeLevel)
        throw new Error(
          "UpdateStudentJoinGrade error: the grade has levels and field join grade level is required."
        );

      if (
        input.joinGradeLevel < 1 ||
        (joinGrade.maxLevel && input.joinGradeLevel > joinGrade.maxLevel)
      ) {
        throw new Error(
          `UpdateStudentJoinGrade error: grade level must be between 1 and ${joinGrade.maxLevel}.`
        );
      }

      student.updateJoinGradeLevel(input.joinGradeLevel);
    }

    return await this.studentRepository.update(student);
  }
}
