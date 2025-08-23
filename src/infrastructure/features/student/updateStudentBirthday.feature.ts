import { Student } from "../../../core/domain/student.model";
import { UpdateBirthdayDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentBirthdayFeature } from "../../../core/ports/in/student/updateStudentBirthday.dto";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentBirthdayFeature
  implements IUpdateStudentBirthdayFeature
{
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: UpdateBirthdayDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentBirthday error: student not found");

    student.updateBirthday(input.birthday);

    return await this.studentRepository.update(student);
  }
}
