import { Student } from "../../../core/domain/student.model";
import { UpdateGradeDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentGradeFeature } from "../../../core/ports/in/student/updateStudentGrade.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentGradeFeature implements IUpdateStudentGradeFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: UpdateGradeDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentGrade error: student not found");

    student.updateGrade(input.grade);

    return await this.studentRepository.update(student);
  }
}
