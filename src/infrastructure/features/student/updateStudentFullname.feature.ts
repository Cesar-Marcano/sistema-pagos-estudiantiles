import { Student } from "../../../core/domain/student.model";
import { UpdateFullnameDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentFullnameFeature } from "../../../core/ports/in/student/updateStudentFullname.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentFullnameFeature
  implements IUpdateStudentFullnameFeature
{
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: UpdateFullnameDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentFullname error: student not found");

    student.updateFullname(input.fullname);

    return await this.studentRepository.update(student);
  }
}
