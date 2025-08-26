import { Student } from "../../../core/domain/student.model";
import { UpdateSectionDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentSectionFeature } from "../../../core/ports/in/student/updateStudentSection.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentSectionFeature
  implements IUpdateStudentSectionFeature
{
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: UpdateSectionDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentPeriod error: student not found.");

    student.updateSection(input.section);

    return await this.studentRepository.update(student);
  }
}
